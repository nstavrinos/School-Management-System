const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const axios  = require("axios");
require('dotenv').config();
const coursesRoutes = require('./routes/coursesRoutes');
const gradesRoutes = require('./routes/gradesRoutes');
const programsRoutes = require('./routes/programsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');

const url = process.env.MONGO_URL ;

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // preflightContinue: false,
        // optionsSuccessStatus: 204
    }
));

// Connect to the local MongoDB database
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.send('WELCOME TO THE SCHOOL MANAGEMENT SYSTEM API!');
    })

app.use('/api/courses', coursesRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);

module.exports = app;