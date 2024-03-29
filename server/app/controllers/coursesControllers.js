// Import any necessary modules or models
const Course = require('../models/course');
const Grade = require('../models/grade');
const Program = require('../models/program');
const Student = require('../models/student');
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
        const course = await Course.findById(courseId).populate(['teacher','program',{path:'grades',populate:'student'}]);

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
        const course = await Course.findByIdAndUpdate(courseId,{ $unset: { teacher: 1 } }).populate({path:'grades',populate:'student'});

        // Logic to remove the course from the teacher
        await Teacher.findByIdAndUpdate(course.teacher,{ $pull: { courses: course._id } },{ new: true });

        course.teacher = undefined;

        // Send a success message as a response
        //res.status(200).json({ message: 'Teacher removed from the course successfully' });
        res.status(200).json(course);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Example async controller for deleting a course
const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findByIdAndDelete(courseId);

        //if course is not found
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Logic to delete the course from the program
        await Program.findByIdAndUpdate(course.program,{ $pull: { courses: courseId } },{ new: true });
        await Teacher.findByIdAndUpdate(course.teacher,{ $pull: { courses: courseId } },{ new: true });
        await Grade.deleteMany({course:courseId});
        await Student.updateMany({grades:{$in:course.grades}},{ $pull: { grades: {$in:course.grades} } },{ new: true });

        // Send a success message as a response
        res.status(200).json(course);
    } catch (error) {
        console.log(error);
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