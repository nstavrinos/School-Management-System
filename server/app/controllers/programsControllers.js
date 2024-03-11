// Import any necessary modules or models
const Student = require('../models/student');
const Program = require('../models/program');

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

        // If the program has students, fetch them from the database
        if(program.students.length > 0){
            // join students with programs
            const students = await Student.find({_id: {$in: program.students}});
            program.students = students;

        }

        // Return the program as a response
        res.status(200).json(program);
    } catch (error) {

        // If the program is not found, return a 404 response
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Program not found' });
        }
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for creating a new program
const createProgram = async (req, res) => {
    try {

        // Logic to create a new program in the database
        const newProgram = await Program.create(req.body);
       
        // Return the newly created program as a response
        res.status(201).json({message: 'Program created successfully',newProgram});
    } catch (error) {
        // Handle any errors that occur during the process
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for updating a program
const updateProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;

        // Logic to update the program in the database
        const updatedProgram = await Program.findByIdAndUpdate(id, req.body, { new: true });

        // Return the updated program as a response
        res.status(200).json({message: 'Program updated successfully', updatedProgram});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Example async controller for creating a new student and adding it to a program
const createStudentUpdateProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;
        const student = req.body;

        // Logic to create a new student in the database
        const newStudent = await Student.create(student);

        // Logic to update the program in the database
        const program = await Program.findById(id);
        program.students.push(newStudent._id);
        await program.save();

        // Return the newly created student as a response
        res.status(201).json({message: 'Student added successfully',newStudent});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Example async controller for deleting a program
const deleteProgram = async (req, res) => {
    try {
        // Extract the necessary data from the Url parameters
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
    createStudentUpdateProgram,
    deleteProgram,
};