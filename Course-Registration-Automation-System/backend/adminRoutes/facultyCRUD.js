const router = require('express').Router();
let Faculty = require('../models/faculty.model');
const mongoose = require('mongoose');


// //get means to get something from the server and give it back to the client(user)
// // give the admin all the courses
// router.route('/').get((req, res) => {

//     // const semester_num = req.body.semester_num;
//     // console.log(semester_num);

//     // Course.find({ 'semester_num': semester_num }, 'course_name')
//     //     .then(coursesInTheSemester => res.json(coursesInTheSemester))
//     //     .catch(err => res.status(400).json('Error: ' + err));
//     console.log("Inside get");
//     Course.find()
//         .then(allCourses => res.json(allCourses))
//         .catch(err => res.status(400).json('Error: ' + err));

// });


// post means to add something to the server
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const faculty_id = req.body.faculty_id;
    const department = req.body.department;
    const admin = req.body.admin;
    const hod = req.body.hod;

    const faculty = new Faculty({ "name": name, "faculty_id": faculty_id, "department": department, "admin": admin, "HOD": hod });
    console.log(faculty);

    faculty.save()
        .then(() => res.json('faculty added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// router.route('/update/').post((req, res) => {
//     console.log(req.body.selectedCourse);
//     console.log(req.body.semester_num);
//     var myquery = { course_name: req.body.selectedCourse };
//     var newvalues = { $set: { semester_num: req.body.semester_num } };
//     Course.updateOne(myquery, newvalues, (err, res) => {
//         if (err) throw err;
//         console.log("Update Done");
//     })
//     // .then(() => console.log("Update Done"))
//     // .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;