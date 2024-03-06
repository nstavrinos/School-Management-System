const express = require('express');
const teachersController = require('../controllers/teachersControllers');

const router = express.Router();

// GET all teachers
router.get('/teachers', teachersController.getAllTeachers);

// GET a specific teacher by ID
router.get('/teachers/:id', teachersController.getTeacherById);

// POST a new teacher
router.post('/teachers', teachersController.createTeacher);

// PUT/update a teacher by ID
router.put('/teachers/:id', teachersController.updateTeacher);

// DELETE a teacher by ID
router.delete('/teachers/:id', teachersController.deleteTeacher);

module.exports = router;