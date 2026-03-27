const express = require('express');
const cors = require('cors');
require('dotenv').config();

const peopleRoutes = require('./routes/people.routes');
const pool = require('./config/db');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'People Manager API is running.' });
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
  }
});

app.use('/api/people', peopleRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
