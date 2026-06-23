let users = [
  { id: 1, name: 'Ali Hassan', email: 'ali.hassan@example.com', role: 'ASL Learner' }
];

const getUser = (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

const updateUser = (req, res) => {
  try {
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ success: false, error: 'User not found' });
    const { name, email } = req.body;
    if (name) users[idx].name = name;
    if (email) users[idx].email = email;
    res.json({ success: true, data: users[idx], message: 'Profile updated' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

module.exports = { getUser, updateUser };
