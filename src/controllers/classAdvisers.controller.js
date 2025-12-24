const pool = require('../config/db');

// GET advisers
exports.getClassAdvisers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ca.id, ca.name,
             d.name AS department_name,
             c.year, c.section
      FROM class_advisers ca
      JOIN departments d ON d.id = ca.department_id
      JOIN classes c ON c.id = ca.class_id
      ORDER BY ca.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE adviser
exports.createClassAdviser = async (req, res) => {
  try {
    const { name, department_id, class_id } = req.body;

    if (!name || !department_id || !class_id) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const result = await pool.query(
      `
      INSERT INTO class_advisers (name, department_id, class_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, department_id, class_id]
    );

    res.status(201).json({
      message: 'Class adviser added',
      adviser: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
