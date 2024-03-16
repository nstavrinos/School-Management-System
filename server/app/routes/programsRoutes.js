const express = require('express');
const programsController = require('../controllers/programsControllers');
const router = express.Router();


// GET /programs
router.get('/', programsController.getAllPrograms);

// GET /programs/:id
router.get('/:id', programsController.getProgramById);

// POST /programs
router.post('/', programsController.createProgram);

// PATCH /programs/:id
router.patch('/:id', programsController.updateProgram);

// PATCH /programs/addStudentToProgram/:id
//router.patch('/addStudentToProgram/:id', programsController.addStudentToProgram);

// PATCH /programs/removeStudentFromProgram/:id
router.patch('/removeStudentFromProgram/:id', programsController.removeStudentFromProgram);

// PATCH /programs/addStudentsToProgram/:id
router.patch('/addStudentsToProgram/:id', programsController.addStudentsToProgram);

// PATCH /programs/addCourseToProgram/:id
router.patch('/addCourseToProgram/:id', programsController.addCourseToProgram);

// DELETE /programs/:id
router.delete('/:id', programsController.deleteProgram);

module.exports = router;