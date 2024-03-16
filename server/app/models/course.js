const mongoose = require('mongoose');

const courseData = new mongoose.Schema({
    course_name: {type: String, required: true},
    duration: {type: Number, required: true},
    grades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        default: []
    }],
    program:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        default: undefined
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: undefined
    }

}, {timestamps: true});

const Course = mongoose.model('Course' , courseData);

module.exports = Course;