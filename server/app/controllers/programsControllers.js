// Import any necessary modules or models
const Student = require('../models/student');
const Program = require('../models/program');
const Course = require('../models/course');

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
        const program = await Program.findById(id).populate(['students','courses']);

        // If the program has students, fetch them from the database
        // if(program.students.length > 0){
        //     // join students with programs
        //     const students = await Student.find({_id: {$in: program.students}});
        //     program.students = students;

        // }

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
        res.status(201).json(newProgram);
      //  res.status(201).json({message: 'Program created successfully',newProgram});
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
        const updatedProgram = await Program.findByIdAndUpdate(id, req.body, { new: true }).populate(['students','courses']);

        // if(updatedProgram.students.length > 0){
        //     // join students with programs
        //     const students = await Student.find({_id: {$in: updatedProgram.students}});
        //     updatedProgram.students = students;

        // }
        
        // Return the updated program as a response
        res.status(200).json( updatedProgram);
       // res.status(200).json({message: 'Program updated successfully', program: updatedProgram});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Example async controller for creating a new student and adding it to a program
// const addStudentsToProgram = async (req, res) => {
//     try {
//         // Extract the necessary data from the request body and parameters
//         const { id } = req.params;
//         const studentsId = req.body;

//         // Logic to find the students in the database
//         const addStudents = await Student.find({_id: {$in: studentsId}});

//         console.log("addstudents",addStudents);

//         // Logic to update the program in the database
//         const program = await Program.findById(id);
//         addStudents.forEach(student => {
//             if(!program.students.includes(student._id)){
//                 program.students.push(student._id);
//             }
//         });
//         await program.save();
//         console.log("pushedstudents",program.students);
//         // join students with programs
//         const students = await Student.find({_id: {$in: program.students}});
//         program.students = students;



//         // Return the newly created student as a response
//         res.status(201).json(program);
//         //res.status(201).json({message: 'Student added successfully',program});
//     } catch (error) {
//         // Handle any errors that occur during the process
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// Example async controller for adding a students to a program
const addStudentsToProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;
        const students = req.body;

        // Logic to update the program in the database
        const program = await Program.findById(id);
        program.students = program.students.concat(students);
        await program.save();

        // join students with programs
        const studentsList = await Student.find({_id: {$in: program.students}});
        program.students = studentsList;

        // insert program to students
        // studentsList.forEach(async student => {
        //     if(!student.programs.includes(program._id)){
        //         student.programs.push(program._id);
        //         await student.save();
        //     }
        // });
       

        // Return the updated program as a response
        res.status(200).json(program);
        //res.status(200).json({message: 'Students added successfully',program});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Example async controller for removing a student from a program
const removeStudentFromProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;
        const  studentId  = req.body.studentId;

        // Logic to remove the student from the program in the database
        const program = await Program.findById(id);
        program.students = program.students.filter(student => student != studentId);
        await program.save();

        // Return a success message as a response
        //res.status(200).json({ message: 'Student removed successfully' });
        res.status(200).json(program);

    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for adding a course to a program
const addCourseToProgram = async (req, res) => {
    try {
        // Extract the necessary data from the request body and parameters
        const { id } = req.params;
        const {course_name,duration} = req.body;

        //create a new course and add it to the program
        const newCourse = await Course.create({course_name: course_name, duration: duration, program: id});

        // Logic to update the program in the database
        const program = await Program.findById(id).populate('students');

        if(!program.courses.includes(newCourse._id)){
            program.courses.push(newCourse._id);

        }
        await program.save();
        
        // join courses with programs
        await program.populate('courses');

        // Return the updated program as a response
        res.status(200).json(program);
        //res.status(200).json({message: 'Course added successfully', program});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};



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
  //  addStudentToProgram,
    addStudentsToProgram,
    removeStudentFromProgram,
    addCourseToProgram,
    deleteProgram,
};