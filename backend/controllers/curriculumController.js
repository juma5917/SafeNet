const path = require('path');
const fs = require('fs');

exports.getCurriculum = (req, res) => {
  try {
    const lang = (req.query.lang || 'en').toLowerCase();
    let file = path.join(__dirname, '..', 'data', 'curriculum.json');
    if (lang === 'sw' || lang === 'swahili') {
      const swFile = path.join(__dirname, '..', 'data', 'curriculum_sw.json');
      if (fs.existsSync(swFile)) file = swFile;
    }
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    return res.json(json);
  } catch (err) {
    console.error('Error reading curriculum:', err);
    return res.status(500).json({ error: 'Unable to load curriculum' });
  }
};
