const mongoose = require('mongoose');

const programData = new mongoose.Schema({
    program_name: {type: String, required: true},
    duration: {type: Number, required: true},
    es: {type: String},
    begin: {type: String, required: true},
    end: {type: String, required: true},
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
    
});

const Program = mongoose.model('Program' , programData);

module.exports = Program;