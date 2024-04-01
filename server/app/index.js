const express = require("express");
const cors = require("cors");
const axios  = require("axios");
require('dotenv').config();
const connectDB = require('./configs/dbConn.js');
const coursesRoutes = require('./routes/coursesRoutes');
const gradesRoutes = require('./routes/gradesRoutes');
const programsRoutes = require('./routes/programsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
));

connectDB();

app.get('/', (req, res) => {
    res.send('WELCOME TO THE SCHOOL MANAGEMENT SYSTEM API!');
})

app.use('/api/courses', coursesRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);

module.exports = app;