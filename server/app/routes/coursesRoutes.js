const express = require('express');
const coursesController = require('../controllers/coursesControllers');

const router = express.Router();

// GET all courses
router.get('/', coursesController.getAllCourses);

// GET a specific course by ID
router.get('/:id', coursesController.getCourseById);

// POST a new course
router.post('/', coursesController.createCourse);

// PUT/update a course by ID
router.put('/:id', coursesController.updateCourse);

// DELETE a course by ID
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;