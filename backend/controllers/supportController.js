const SupportResource = require('../models/SupportResource');

exports.getSupportResources = async (req, res) => {
  try {
    const { type, availability, region } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (availability) filter.availability = availability;
    if (region) filter.serving_regions = { $in: [region] };

    const resources = await SupportResource.find(filter);
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSupportResourceById = async (req, res) => {
  try {
    const resource = await SupportResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createSupportResource = async (req, res) => {
  try {
    const { name, description, type, contact_info, availability, languages, serving_regions } = req.body;

    const resource = new SupportResource({
      name,
      description,
      type,
      contact_info,
      availability,
      languages,
      serving_regions
    });

    await resource.save();
    res.status(201).json({ message: 'Support resource created', resource });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
