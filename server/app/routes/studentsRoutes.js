const express = require('express');
const studentsController = require('../controllers/studentsControllers');

const router = express.Router();

// GET all students
router.get('/students', studentsController.getAllStudents);

// GET a specific student by ID
router.get('/students/:id', studentsController.getStudentById);

// POST a new student
router.post('/students', studentsController.createStudent);

// PUT/update a student by ID
router.put('/students/:id', studentsController.updateStudent);

// DELETE a student by ID
router.delete('/students/:id', studentsController.deleteStudent);

module.exports = router;