const express = require('express');
const programsController = require('../controllers/programsControllers');
const router = express.Router();


// GET /programs
router.get('/', programsController.getAllPrograms);

// GET /programs/:id
router.get('/:id', programsController.getProgramById);

// POST /programs
router.post('/', programsController.createProgram);

// PUT /programs/:id
router.put('/:id', programsController.updateProgram);

// DELETE /programs/:id
router.delete('/:id', programsController.deleteProgram);

module.exports = router;