const mongoose = require('mongoose');

const gradeData = new mongoose.Schema({
    grade: {type: Number, required: true},
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {timestamps: true});

const Grade = mongoose.model('Grade' , gradeData);

module.exports = Grade;