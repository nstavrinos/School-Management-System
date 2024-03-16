// Import any necessary modules or models
const Course = require('../models/course');
const Program = require('../models/program');

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
        const course = await Course.findById(courseId);

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
        const { title, description, price } = req.body;

        // Logic to create a new course in the database
        const newCourse = await Course.create({ title, description, price });

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
      //  const { title, description, price } = req.body;
        const courseId = req.params.id;

        console.log("REQ.BODY:",req.body);

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
    deleteCourse,
};