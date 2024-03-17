const express = require('express');
const coursesController = require('../controllers/coursesControllers');

const router = express.Router();

// GET all courses
router.get('/', coursesController.getAllCourses);

// GET a specific course by ID
router.get('/:id', coursesController.getCourseById);

// POST a new course
router.post('/', coursesController.createCourse);

// PATCH update a course by ID
router.patch('/:id', coursesController.updateCourse);

// PATCH add a teacher to a course by ID
//router.patch('/:id/addTeacher', coursesController.addTeacherToCourse);
router.patch('/addTeacherToCourse/:id', coursesController.addTeacherToCourse);

// PATCH remove a teacher from a course by ID
router.patch('/removeTeacherFromCourse/:id', coursesController.removeTeacherFromCourse);

// DELETE a course by ID
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;