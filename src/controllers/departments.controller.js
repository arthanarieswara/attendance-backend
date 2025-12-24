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

// UPDATE department
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, is_active } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' });
    }

    const result = await pool.query(
      `
      UPDATE departments
      SET name = $1,
          code = $2,
          is_active = COALESCE($3, is_active)
      WHERE id = $4
      RETURNING *
      `,
      [name, code, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({
      message: 'Department updated successfully',
      department: result.rows[0],
    });
  } catch (error) {
    console.error('Update department error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

