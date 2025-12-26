const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// CREATE STAFF USER
exports.createStaffUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            department_id,
            class_id,
        } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        if (role === 'HOD' && !department_id) {
            return res.status(400).json({ message: 'Department required for HOD' });
        }

        if (role === 'ClassAdviser' && (!department_id || !class_id)) {
            return res.status(400).json({
                message: 'Department & Class required for Class Adviser',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
      INSERT INTO staff_users
      (name, email, password, role, department_id, class_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, role
      `,
            [
                name,
                email,
                hashedPassword,
                role,
                department_id || null,
                class_id || null,
            ]
        );

        res.status(201).json({
            message: 'User created successfully',
            user: result.rows[0],
        });
    } catch (error) {
        console.error('Create staff user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// UPDATE STAFF USER
exports.updateStaffUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            role,
            department_id,
            class_id,
            password,
        } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        if (role === 'HOD' && !department_id) {
            return res.status(400).json({ message: 'Department required for HOD' });
        }

        if (role === 'ClassAdviser' && (!department_id || !class_id)) {
            return res.status(400).json({
                message: 'Department & Class required for Class Adviser',
            });
        }

        let query;
        let values;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            query = `
        UPDATE staff_users
        SET name=$1, email=$2, role=$3,
            department_id=$4, class_id=$5, password=$6
        WHERE id=$7
        RETURNING id, name, email, role
      `;

            values = [
                name,
                email,
                role,
                department_id || null,
                class_id || null,
                hashedPassword,
                id,
            ];
        } else {
            query = `
        UPDATE staff_users
        SET name=$1, email=$2, role=$3,
            department_id=$4, class_id=$5
        WHERE id=$6
        RETURNING id, name, email, role
      `;

            values = [
                name,
                email,
                role,
                department_id || null,
                class_id || null,
                id,
            ];
        }

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user: result.rows[0],
        });
    } catch (error) {
        console.error('Update staff user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET ALL STAFF USERS
exports.getStaffUsers = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
        su.id,
        su.name,
        su.email,
        su.role,
        d.name AS department_name,
        c.year,
        c.section
      FROM staff_users su
      LEFT JOIN departments d ON su.department_id = d.id
      LEFT JOIN classes c ON su.class_id = c.id
      ORDER BY su.created_at DESC
    `);

        res.json(result.rows);
    } catch (error) {
        console.error('Get staff users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

