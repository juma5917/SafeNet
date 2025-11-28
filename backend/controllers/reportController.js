const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { incident_type, severity, description, evidence_url, platform, is_anonymous } = req.body;

    const report = new Report({
      user_id: req.user.id,
      incident_type,
      severity,
      description,
      evidence_url,
      platform,
      is_anonymous: is_anonymous || false
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user_id: req.user.id }).populate('user_id', 'name email');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const { status, incident_type, severity } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (incident_type) filter.incident_type = incident_type;
    if (severity) filter.severity = severity;

    const reports = await Report.find(filter).populate('user_id', 'name email').sort({ created_at: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, updated_at: Date.now() },
      { new: true }
    );
    res.json({ message: 'Report updated', report });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getReportStats = async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const byType = await Report.aggregate([
      { $group: { _id: '$incident_type', count: { $sum: 1 } } }
    ]);
    const bySeverity = await Report.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);
    const byStatus = await Report.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({ total, byType, bySeverity, byStatus });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
