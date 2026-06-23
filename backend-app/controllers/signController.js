const signs = require('../data/signs.json');
let history = [];

const getAllSigns = (req, res) => {
  try {
    let result = [...signs];
    const { category, search } = req.query;
    if (category) result = result.filter(s => s.category.toLowerCase() === category.toLowerCase());
    if (search) result = result.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.meaning.toLowerCase().includes(search.toLowerCase())
    );
    res.json({ success: true, count: result.length, data: result });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

const getSignById = (req, res) => {
  try {
    const sign = signs.find(s => s.id === parseInt(req.params.id));
    if (!sign) return res.status(404).json({ success: false, error: 'Sign not found' });
    res.json({ success: true, data: sign });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

const saveHistory = (req, res) => {
  try {
    const { name, confidence, category, language } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Sign name required' });
    const entry = {
      id: Date.now(), name, confidence, category, language,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString(),
    };
    history.unshift(entry);
    history = history.slice(0, 100);
    res.status(201).json({ success: true, data: entry });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

const getHistory = (req, res) => {
  try { res.json({ success: true, count: history.length, data: history }); }
  catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

module.exports = { getAllSigns, getSignById, saveHistory, getHistory };
