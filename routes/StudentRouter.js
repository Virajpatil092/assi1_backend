import express from 'express'
import { createStudent,  getAllStudents, getStudentById, updateStudentById, deleteStudentById } from '../controllers/StudentController.js'

const router = express.Router();

router.post('/student', createStudent);
router.get('/student', getAllStudents);
router.get('/student/:id', getStudentById);
router.put('/student/:id', updateStudentById);
router.delete('/student/:id', deleteStudentById);

export default router;