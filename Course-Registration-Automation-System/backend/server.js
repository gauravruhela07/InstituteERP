const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000;

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
// mongoose.connect("mongodb://localhost:27017/course_registration", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
//     if (!error) {
//         console.log("Connected");
//     }
//     else {
//         console.log("Not connected");
//     }
// });
//////////////////////////////////////////////


const uri = "mongodb+srv://root:root@cluster0.hevkx.gcp.mongodb.net/course_registration?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})




// Adding routers for the DB models

// Students
const studentRouter = require('./studentRoutes/student_login_signup');
const student_subjectRouter = require('./studentRoutes/student_subject');

app.use('/student', studentRouter);
app.use('/student_subject', student_subjectRouter);


// Admin
const coursesRouter = require('./adminRoutes/coursesCRUD');
const facultyRouter = require('./adminRoutes/facultyCRUD');
const adminCredRouter = require('./adminRoutes/adminCredCRUD');
const student_Router = require('./adminRoutes/studentCRUD');
const teaches_Router = require('./adminRoutes/teachesCRUD');
const feeRouter = require('./adminRoutes/studentFeesCRUD');


app.use('/course', coursesRouter);
app.use('/faculty', facultyRouter);
app.use('/adminCred', adminCredRouter);
app.use('/student', student_Router);
// app.use('/studentSub', studentSubject_Router);
app.use('/teaches', teaches_Router);
app.use('/fee', feeRouter);


if (process.env.NODE_ENV === "production") {
    app.use(express.static('../build'))
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })
}


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
