const pool = require('../config/db');

// GET students
exports.getStudents = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT s.id, s.register_number, s.name,
             d.name AS department_name,
             c.year, c.section
      FROM students s
      JOIN departments d ON d.id = s.department_id
      JOIN classes c ON c.id = s.class_id
      ORDER BY s.id DESC
    `);

        res.json(result.rows);
    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// CREATE student
exports.createStudent = async (req, res) => {
    try {
        const { register_number, name, department_id, class_id } = req.body;

        if (!register_number || !name || !department_id || !class_id) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const result = await pool.query(
            `
      INSERT INTO students (register_number, name, department_id, class_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
            [register_number, name, department_id, class_id]
        );

        res.status(201).json({
            message: 'Student added successfully',
            student: result.rows[0],
        });
    } catch (error) {
        console.error('Create student error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// UPDATE student
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { register_number, name, department_id, class_id, is_active } = req.body;

        const result = await pool.query(
            `
      UPDATE students
      SET register_number = $1, name = $2, department_id = $3, class_id = $4, is_active = $5
      WHERE id = $6
      RETURNING *
      `,
            [register_number, name, department_id, class_id, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({
            message: 'Student updated successfully',
            student: result.rows[0],
        });
    } catch (error) {
        console.error('Update student error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// DELETE student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM students WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};