const app =  require("./app/index.js");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Run the server after connecting to the database
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> {console.log(`Server running on Port ${PORT} \n`)});
});

// Show an error message if the connection to the database fails
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
