const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

var port = 5000;

app.use(cors()); // cors acts as middleware
app.use(express.json()) // for parsing the sent and received json


/////////////////////////////////////////////Gaurav Ruhela will connect using this
// const uri = 'mongodb://127.0.0.1:27017/';

// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB Connection is established successfully');
// });
///////////////////////////////////////////





//////////////////////////////////////////////Amber will connect using this
mongoose.connect("mongodb://localhost:27017/course_registration", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
    if (!error) {
        console.log("Connected");
    }
    else {
        console.log("Not connected");
    }
});
//////////////////////////////////////////////




// Adding routers for the DB models

// Students
const studentRouter = require('./studentRoutes/student_login_signup');
const student_subjectRouter = require('./studentRoutes/student_subject');

app.use('/student', studentRouter);
app.use('/student_subject', student_subjectRouter);


// Admin
const coursesRouter = require('./adminRoutes/coursesCRUD');
const facultyRouter = require('./adminRoutes/facultyCRUD');

app.use('/course', coursesRouter);
app.use('/faculty', facultyRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});