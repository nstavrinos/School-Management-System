const mongoose = require('mongoose');

const programData = new mongoose.Schema({
    program_name: {type: String, required: true},
    begin: {type: Date, required: true},
    end: {type: Date, required: true},
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: []
    }],
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }]
    }, {timestamps: true});

const Program = mongoose.model('Program' , programData);

module.exports = Program;