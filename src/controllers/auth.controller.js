const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* ===================== ADMIN LOGIN ===================== */
/* Admin ONLY (users table) */

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1
      AND role = 'Admin'
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('ADMIN LOGIN ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ===================== STAFF LOGIN ===================== */
/* Principal, HOD, ClassAdviser (staff_users table) */

exports.staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT * FROM staff_users
      WHERE email = $1
      AND role IN ('Principal', 'HOD', 'ClassAdviser')
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        department_id: user.department_id,
        class_id: user.class_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        class_id: user.class_id,
      },
    });
  } catch (err) {
    console.error('STAFF LOGIN ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
