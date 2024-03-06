const express = require('express');
const gradesController = require('../controllers/gradesControllers');
const router = express.Router();

// GET /grades
router.get('/grades', gradesController.getAllGrades);

// GET /grades/:id
router.get('/grades/:id', gradesController.getGradeById);

// POST /grades
router.post('/grades', gradesController.createGrade);

// PUT /grades/:id
router.put('/grades/:id', gradesController.updateGrade);

// DELETE /grades/:id
router.delete('/grades/:id', gradesController.deleteGrade);

module.exports = router;