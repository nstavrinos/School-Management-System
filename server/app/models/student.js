const mongoose = require('mongoose');

const studentData = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    grades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    }],
    
});

const Student = mongoose.model('Student' , studentData);

module.exports = Student;