const mongoose = require('mongoose');

const teacherData = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    }, {timestamps: true});

const Teacher = mongoose.model('Teacher' , teacherData);

module.exports = Teacher;