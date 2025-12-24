if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const departmentRoutes = require('./routes/departments.routes');
const pool = require('./config/db');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', departmentRoutes);
app.use('/api', require('./routes/classes.routes'));
app.use('/api', require('./routes/classAdvisers.routes'));


app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(`Attendance Backend is running. DB Time: ${result.rows[0].now}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
