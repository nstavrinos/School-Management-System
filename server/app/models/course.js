const mongoose = require('mongoose');

const courseData = new mongoose.Schema({
    course_name: {type: String, required: true},
    duration: {type: Number, required: true},
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
    
});

const Course = mongoose.model('Course' , courseData);

module.exports = Course;