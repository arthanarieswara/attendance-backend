require('dotenv').config(); // MUST be at top

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(`Attendance Backend is running. DB Time: ${result.rows[0].now}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  