const express = require('express');
const cors = require('cors');
const signRoutes = require('./routes/signRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({origin: ['http://localhost:3001', 'http://localhost:3002'] }));
app.use(express.json());

app.use('/api/signs', signRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'AI Sign Detector API running', version: '1.0.0' });
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
