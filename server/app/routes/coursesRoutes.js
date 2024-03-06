const express = require('express');
const coursesController = require('../controllers/coursesControllers');

const router = express.Router();

// GET all courses
router.get('/courses', coursesController.getAllCourses);

// GET a specific course by ID
router.get('/courses/:id', coursesController.getCourseById);

// POST a new course
router.post('/courses', coursesController.createCourse);

// PUT/update a course by ID
router.put('/courses/:id', coursesController.updateCourse);

// DELETE a course by ID
router.delete('/courses/:id', coursesController.deleteCourse);

module.exports = router;