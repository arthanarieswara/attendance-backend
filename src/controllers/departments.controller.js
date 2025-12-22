const pool = require('../config/db');

// GET departments
exports.getDepartments = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM departments ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE department
exports.createDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' });
    }

    const result = await pool.query(
      'INSERT INTO departments (name, code) VALUES ($1, $2) RETURNING *',
      [name, code]
    );

    res.status(201).json({
      message: 'Department created successfully',
      department: result.rows[0],
    });
  } catch (error) {
    console.error('Create department error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
