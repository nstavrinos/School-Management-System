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

router.patch('/addStudent/:id', programsController.createStudentUpdateProgram);

// DELETE /programs/:id
router.delete('/:id', programsController.deleteProgram);

module.exports = router;