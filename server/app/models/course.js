const mongoose = require('mongoose');

const courseData = new mongoose.Schema({
    course_name: {type: String, required: true},
    duration: {type: Number, required: true},
    grades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    }],
    program:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }

}, {timestamps: true});

const Course = mongoose.model('Course' , courseData);

module.exports = Course;