const express = require('express');
const gradesController = require('../controllers/gradesControllers');
const router = express.Router();

// GET /grades
router.get('/', gradesController.getAllGrades);

// GET /grades/:id
router.get('/:id', gradesController.getGradeById);

// POST /grades
router.post('/', gradesController.createGrade);

// PUT /grades/:id
router.put('/:id', gradesController.updateGrade);

// DELETE /grades/:id
router.delete('/:id', gradesController.deleteGrade);

module.exports = router;