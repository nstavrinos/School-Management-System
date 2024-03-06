// Import any necessary modules or models
const Program = require('../models/Program');

// Example async controller for getting all programs
const getAllPrograms = async (req, res) => {
    try {
        // Logic to fetch all programs from the database
        const programs = await Program.find();

        // Return the programs as a response
        res.status(200).json(programs);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for getting a program by id
const getProgramById = async (req, res) => {
    try {
        // Extract the necessary data from the request parameters
        const { id } = req.params;

        // Logic to fetch the program from the database
        const program = await Program.findById(id);

        // Return the program as a response
        res.status(200).json(program);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for creating a new program
const createProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body
        const { name, description } = req.body;

        // Logic to create a new program in the database
        const newProgram = await Program.create({ name, description });

        // Return the newly created program as a response
        res.status(201).json(newProgram);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for updating a program
const updateProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;
        const { name, description } = req.body;

        // Logic to update the program in the database
        const updatedProgram = await Program.findByIdAndUpdate(id, { name, description }, { new: true });

        // Return the updated program as a response
        res.status(200).json(updatedProgram);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for deleting a program
const deleteProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request parameters
        const { id } = req.params;

        // Logic to delete the program from the database
        await Program.findByIdAndDelete(id);

        // Return a success message as a response
        res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the controllers for use in other files
module.exports = {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
};