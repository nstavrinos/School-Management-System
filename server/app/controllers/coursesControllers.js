// Import any necessary modules or models
const Course = require('../models/course');
const Program = require('../models/program');
const Teacher = require('../models/teacher');

// Example async controller for getting all courses
const getAllCourses = async (req, res) => {
    try {
        // Logic to fetch all courses from the database
        const courses = await Course.find();

        // Send the courses as a response
        res.status(200).json(courses);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for getting  course by id
const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Logic to fetch the course from the database
        const course = await Course.findById(courseId).populate(['teacher',{path:'grades',populate:'student'}]);

        // Send the course as a response
        res.status(200).json(course);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Example async controller for creating a new course
async function createCourse(req, res) {
    try {
        // Extract the necessary data from the request body
        //const { course_name, duration, program } = req.body;

        // Logic to create a new course in the database
        const newCourse = await Course.create(req.body);

        // Send the newly created course as a response
        res.status(201).json(newCourse);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Example async controller for updating a course
const updateCourse = async (req, res) => {
    try {
        // Extract the necessary data from the request body
        const courseId = req.params.id;

        // Logic to update the course in the database
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,req.body,
            { new: true }
        );

        // Send the updated course as a response
        res.status(200).json(updatedCourse);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for adding a teacher to a course
const addTeacherToCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const teacherId = req.body.teacherId;

        // Logic to add the teacher to the course
        const course = await Course.findById(courseId);
        course.teacher = teacherId;
        await course.save();

        // Logic to add the course to the teacher
        const teacher = await Teacher.findById(teacherId);
        teacher.courses.push(courseId);
        await teacher.save();

        course.teacher = teacher;

        // Send a success message as a response
       // res.status(200).json({ message: 'Teacher added to the course successfully' });
        res.status(200).json(course);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for removing a teacher from a course
const removeTeacherFromCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Logic to remove the teacher from the course
        const course = await Course.findById(courseId);

        const teacher = await Teacher.findById(course.teacher);
        teacher.courses = teacher.courses.filter((course) => course != course.id);
        await teacher.save();

        course.teacher = undefined;
        await course.save();

        // Logic to remove the course from the teacher


        // Send a success message as a response
        res.status(200).json({ message: 'Teacher removed from the course successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for deleting a course
const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);

        // Logic to delete the course from the program
        const program = await Program.findById(course.program);
        program.courses = program.courses.filter((course) => course != courseId);
        await program.save();

        await course.deleteOne();

        // Logic to delete the course from the database
      //  await Course.findByIdAndDelete(courseId);

        // Send a success message as a response
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the controllers for use in other files
module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    addTeacherToCourse,
    removeTeacherFromCourse,
    deleteCourse,
};