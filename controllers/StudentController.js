import pool from "../Database/db.js";

const createStudent = async (req, res) => {
    const { name, prn, year, branch, email, gender } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO students (name, prn, year, branch, email, gender) VALUES (?, ?, ?, ?, ?, ?)',
            [name, prn, year, branch, email, gender]
        );

        res.json({ message: 'Student created successfully', insertedId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateStudentById = async (req, res) => {
    const { id } = req.params;
    const { name, prn, year, branch, email } = req.body;

    try {
        await pool.query(
            'UPDATE students SET name = ?, prn = ?, year = ?, branch = ?, email = ? WHERE id = ?',
            [name, prn, year, branch, email, id]
        );

        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { createStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById };