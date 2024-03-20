const express = require('express');
const gradesController = require('../controllers/gradesControllers');
const router = express.Router();

// GET /grades
router.get('/', gradesController.getAllGrades);

// GET /grades/:id
router.get('/:id', gradesController.getGradeById);

// POST /grades
router.post('/', gradesController.createGrade);

// PATCH /grades/:id
router.patch('/:id', gradesController.updateGrade);

// DELETE /grades/:id
router.delete('/:id', gradesController.deleteGrade);

module.exports = router;