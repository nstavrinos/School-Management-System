// Import any necessary modules or dependencies
const Teacher = require('../models/teacher');
// Define your async controller functions
const getAllTeachers = async (req, res) => {
    try {
        // Logic to fetch all teachers from the database
         const teachers = await Teacher.find();

        // Return the teachers as a response
        res.status(200).json(teachers);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTeacherById = async (req, res) => {
    try {
        // Extract the teacher ID from the request parameters
        const teacherId = req.params.id;

        // Logic to fetch the teacher by ID from the database
         const teacher = await Teacher.findById(teacherId).populate('courses');

        // Return the teacher as a response
        res.status(200).json(teacher);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createTeacher = async (req, res) => {
    try {
        // Logic to create a new teacher in the database
        const newTeacher = await Teacher.create(req.body);

        // Return the newly created teacher as a response
        res.status(201).json(newTeacher);
    } catch (error) {
        // Handle any errors that occur during the process
       res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTeacher = async (req, res) => {
    try {
        // Extract the teacher ID from the request parameters
        const teacherId = req.params.id;

        // Logic to update the teacher in the database
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, req.body , { new: true }).populate('courses');

        // Return the updated teacher as a response
        res.status(200).json(updatedTeacher);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        // Extract the teacher ID from the request parameters
        const teacherId = req.params.id;

        // Logic to delete the teacher from the database
        await Teacher.findByIdAndDelete(teacherId);

        // Return a success message as a response
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
       res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the controller functions for use in routes or other modules
module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};