const express = require('express');
const teachersController = require('../controllers/teachersControllers');

const router = express.Router();

// GET all teachers
router.get('/', teachersController.getAllTeachers);

// GET a specific teacher by ID
router.get('/:id', teachersController.getTeacherById);

// POST a new teacher
router.post('/', teachersController.createTeacher);

// PATCH update a teacher by ID
router.patch('/:id', teachersController.updateTeacher);

// PATCH remove a course from a teacher by ID
router.patch('/removeCourseFromTeacher/:teacherId', teachersController.removeCourseFromTeacher);

// DELETE a teacher by ID
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;