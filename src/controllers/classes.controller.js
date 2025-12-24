const pool = require('../config/db');

// GET classes
exports.getClasses = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, d.name AS department_name
      FROM classes c
      JOIN departments d ON d.id = c.department_id
      ORDER BY c.year, c.section
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE class
exports.createClass = async (req, res) => {
  try {
    const { year, section, department_id } = req.body;

    if (!year || !department_id) {
      return res.status(400).json({ message: 'Year and department are required' });
    }

    const result = await pool.query(
      `
      INSERT INTO classes (year, section, department_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [year, section || null, department_id]
    );

    res.status(201).json({
      message: 'Class created successfully',
      class: result.rows[0],
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClassesByYear = async (req, res) => {
  try {
    const { year, department_id } = req.query;

    const result = await pool.query(
      `
      SELECT id, year, section
      FROM classes
      WHERE year = $1 AND department_id = $2 AND is_active = true
      ORDER BY section
      `,
      [year, department_id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

