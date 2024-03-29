const express = require('express');
const studentsController = require('../controllers/studentsControllers');

const router = express.Router();

// GET all students
router.get('/', studentsController.getAllStudents);

// GET a specific student by ID
router.get('/:id', studentsController.getStudentById);

// POST a new student
router.post('/', studentsController.createStudent);

// PATCH/update a student by ID
router.patch('/:id', studentsController.updateStudent);

router.patch('/:id/removeProgramFromStudent/', studentsController.removeProgramFromStudent);

// DELETE a student by ID
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;