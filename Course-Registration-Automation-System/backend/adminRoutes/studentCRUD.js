const router = require('express').Router();
let Student = require('../models/student.model');
const mongoose = require('mongoose');


router.route('/insertStudent').post((req, res) => {
    const arrayOfStudent = req.body.theArray;
    var i;
    for(i=0;i<arrayOfStudent.length;i++){
        var student = arrayOfStudent[i];
        const name = student["name"];
        const rollno = student["roll_num"];
        const department = student["department"];
        const email = student["email"];
        const password = student["password"];
        const has_registered = student["has_registered"];

        var newStudent = new Student({ "email":email, "password":password, "name": name, "roll_num": rollno, "department": department, "has_registered": has_registered});
        newStudent.save()
    }
});

router.route('/getAllStudents').get((req,res) => {
    Student.find()
        .then(allStudents => {
            res.json({
                arrayOfStudents: allStudents
            })
        })
        .catch(err => console.log(err))
});


module.exports = router;