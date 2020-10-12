const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/course_registration", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
    if (!error) {
        console.log("Connected");
    }
    else {
        console.log("Not connected");
    }
});

const coursesRouter = require('./adminRoutes/coursesCRUD');

app.use('/course', coursesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});