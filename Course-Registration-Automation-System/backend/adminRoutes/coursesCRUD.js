const router = require('express').Router();
let Course = require('../models/course.model');
const mongoose = require('mongoose');


// //////////////////////////////////////////////////////////////////
// const Schema = mongoose.Schema;

// const courseSchema = new Schema({
//     course_name: { type: String, required: true, trim: true },
//     course_id: { type: String, required: true, trim: true },
//     department: { type: String, required: true, trim: true },
//     elective: { type: Boolean, required: true, trim: true },
//     semester_num: { type: Number, required: true, trim: true },
// },
//     { timestamps: true, }
// );

// const Course = mongoose.model('Course', courseSchema);
// ///////////////////////////////////////////////////////////////////



//get means to get something from the server and give it back to the client(user)
// give the admin all the courses
router.route('/').get((req, res) => {

    // const semester_num = req.body.semester_num;
    // console.log(semester_num);

    // Course.find({ 'semester_num': semester_num }, 'course_name')
    //     .then(coursesInTheSemester => res.json(coursesInTheSemester))
    //     .catch(err => res.status(400).json('Error: ' + err));
    console.log("Inside get");
    Course.find()
        .then(allCourses => res.json(allCourses))
        .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/getSelectedSemesterCourses/').post((req, res) => {
    const semester_num = req.body.semester_num;
    console.log("Inside getSelectedSemesterCourses");
    console.log(semester_num);

    Course.find({ 'semester_num': semester_num })//, 'course_name')
        .then(coursesInTheSemester => res.json(coursesInTheSemester))
        .catch(err => res.status(400).json('Error: ' + err));
});







// post means to add something to the server
router.route('/add').post((req, res) => {
    const course_name = req.body.course_name;
    const course_id = req.body.course_id;
    const department = req.body.department;
    const elective = req.body.elective;
    const semester_num = req.body.semester_num;

    const courses = new Course({ "course_name": course_name, "course_id": course_id, "department": department, "elective": elective, "semester_num": semester_num });
    console.log(courses);

    courses.save()
        .then(() => res.json('course added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/').post((req, res) => {
    console.log(req.body.selectedCourse);
    console.log(req.body.semester_num);
    var myquery = { course_name: req.body.selectedCourse };
    var newvalues = { $set: { semester_num: req.body.semester_num } };
    Course.updateOne(myquery, newvalues, (err, res) => {
        if (err) throw err;
        console.log("Update Done");
    })
    // .then(() => console.log("Update Done"))
    // .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/updateElective/').post((req, res) => {
    console.log(req.body.selectedElectives);
    console.log(req.body.semester_num);
    console.log(req.body.electiveNumber);
    var i;
    for (i = 0; i < req.body.selectedElectives.length; i++) {
        var myquery = { course_name: req.body.selectedElectives[i] };
        var newvalues = { $set: { semester_num: req.body.semester_num, elective: req.body.electiveNumber } };
        Course.updateOne(myquery, newvalues, (err, res) => {
            if (err) throw err;
            console.log("Update Done");
        })
    }
    // .then(() => console.log("Update Done"))
    // .catch(err => res.status(400).json('Error: ' + err));
});









module.exports = router;