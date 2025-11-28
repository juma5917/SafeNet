const Resource = require('../models/Resource');

exports.createResource = async (req, res) => {
  try {
    const { title, category, content, thumbnail_url, resource_type, difficulty_level, estimated_time } = req.body;

    const resource = new Resource({
      title,
      category,
      content,
      thumbnail_url,
      resource_type,
      difficulty_level,
      estimated_time
    });

    await resource.save();
    res.status(201).json({ message: 'Resource created', resource });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getResources = async (req, res) => {
  try {
    const { category, difficulty_level, resource_type } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (difficulty_level) filter.difficulty_level = difficulty_level;
    if (resource_type) filter.resource_type = resource_type;

    const resources = await Resource.find(filter).sort({ created_at: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    // Increment views
    resource.views += 1;
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );
    res.json({ message: 'Resource updated', resource });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
