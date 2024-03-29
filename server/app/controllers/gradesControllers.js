const Grade = require('../models/grade');

// Controller for getting all grades
const getAllGrades = async (req, res) => {};

// Controller for getting  grade by id
const getGradeById = async (req, res) => {};

// Controller for creating a new grade
const createGrade = async (req, res) => {};

// Controller for updating a grade
const updateGrade = async (req, res) => {
    try {
        // Extract the necessary data from the request parameters and body
        const { id } = req.params;
        const new_grade = req.body.new_grade;

        // Logic to update the grade in the database
        const updatedGrade = await Grade.findByIdAndUpdate(id,{grade:new_grade}, { new: true });

        if (!updatedGrade) {
            // Return a 404 error if the grade is not found in the database
            return res.status(404).send({ error: 'Grade not found' });
        }

        // Return the updated grade as a response
        res.status(200).send(updatedGrade);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Controller for deleting a grade
const deleteGrade = async (req, res) => {};

// Export the controllers for use in other files
module.exports = {
    getAllGrades,
    getGradeById,
    createGrade,
    updateGrade,
    deleteGrade,
};