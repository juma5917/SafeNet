const SecurityTip = require('../models/SecurityTip');

exports.getSecurityTips = async (req, res) => {
  try {
    const { category, severity, risk_level } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (severity) filter.severity = severity;
    if (risk_level) filter.risk_level = risk_level;

    const tips = await SecurityTip.find(filter).sort({ created_at: -1 });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createSecurityTip = async (req, res) => {
  try {
    const { title, category, tip, severity, risk_level } = req.body;

    const securityTip = new SecurityTip({
      title,
      category,
      tip,
      severity,
      risk_level
    });

    await securityTip.save();
    res.status(201).json({ message: 'Security tip created', securityTip });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSecurityTipById = async (req, res) => {
  try {
    const tip = await SecurityTip.findById(req.params.id);
    if (!tip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
