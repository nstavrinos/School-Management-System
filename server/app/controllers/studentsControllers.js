// Import any necessary modules or models
const Student = require('../models/student');
const Program = require('../models/program');
const Course = require('../models/course');
const Grade = require('../models/grade');

// Example controller for getting all students
const getAllStudents = async (req, res) => {
    try {
        // Logic to fetch all students from the database
        const students = await Student.find();

        // Return the students as a response
        res.status(200).json(students);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example controller for getting a student by ID
const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Logic to fetch the student from the database
        const student = await Student.findById(studentId).populate(['programs',{path:'grades',populate: { path:'course' , populate: ['teacher','program']}}]);

        // Return the student as a response
        res.status(200).json(student);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example controller for creating a new student
const createStudent = async (req, res) => {
    try {

        // Logic to create a new student in the database
        const newStudent = await Student.create(req.body);

        // Return the newly created student as a response
        res.status(201).json(newStudent);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example controller for updating a student
const updateStudent = async (req, res) => {
    try {
        // Extract the necessary data from the request body
        const studentId = req.params.id;

        // Logic to update the student in the database
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            req.body,
            { new: true }
        );

        // Return the updated student as a response
        res.status(200).json(updatedStudent);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example controller for deleting a student
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Logic to find the student from the database
        const student = await Student.findByIdAndDelete(studentId);

        // If the student is not found, return an error message
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Logic to remove the student from all programs and courses and delete all grades
        await Program.updateMany({_id:{$in:student.programs}},{ $pull: { students: student._id } },{ new: true });
        await Course.updateMany({grades:{$in:student.grades}},{ $pull: { grades: {$in:student.grades} } },{ new: true });
        await Grade.deleteMany({student:student._id});

        // Return a success message as a response
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example controller for removing a program from a student
const removeProgramFromStudent = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;
        const programId  = req.body.programId;

        // Logic to remove the program from the student in the database  
        const student = await Student.findByIdAndUpdate(id, { $pull: { programs: programId } },{ new: true });

        // if the student is not found, return a 404 response
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
    
        // Logic to remove the student from the program in the database
        const program = await Program.findByIdAndUpdate(programId, { $pull: { students: student._id } },{ new: true });

        // if the program is not found, return a 404 response
        if (!program) {
            return res.status(404).send({ error: 'Program not found' });
        }

         // Logic to delete the grade for each course in the program in the database
        program.courses.forEach(async course_id => {
            const grade=await Grade.findOneAndDelete({course: course_id, student: student._id});
            await Course.findByIdAndUpdate(course_id, { $pull: { grades: grade._id } },{ new: true });
            await Student.findByIdAndUpdate(student._id, { $pull: { grades: grade._id } },{ new: true });

        });

        // Logic to populate the student with the programs and grades
        await student.populate(['programs',{path:'grades',populate: { path:'course' , populate: ['teacher','program']}}]);

        // Return a success message as a response
        res.status(200).send(student);

    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Export the controllers for use in routes or other files
module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    removeProgramFromStudent,
};