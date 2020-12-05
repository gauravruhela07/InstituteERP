const router = require('express').Router();
let Student = require('../models/student.model');
const mongoose = require('mongoose');


router.route('/insertStudent').post((req, res) => {
    const arrayOfStudent = req.body.theArray;
    var i;
    console.log("inserting student");
    let p = new Promise((resolve, reject) => {
        counter = 0
        for (i = 0; i < arrayOfStudent.length; i++) {
            var student = arrayOfStudent[i];
            const name = student["name"];
            const rollno = student["roll_num"];
            const department = student["department"];
            const email = student["email"];
            const password = student["password"];
            const has_registered = student["has_registered"];

            var newStudent = new Student({ "email": email, "password": password, "name": name, "roll_num": rollno, "department": department, "has_registered": has_registered });
            newStudent.save()
                .then(() => {
                    counter++;
                })
                .then(() => {
                    if (counter == arrayOfStudent.length - 1) {
                        resolve();
                    }
                })
                .catch((err) => {
                    reject();
                })
        }
    })

    p.then(() => {
        res.json({
            message: "successful"
        })
    }).catch(() => {
        res.json({
            message: "unsuccessful"
        })
    })


});

router.route('/getAllStudents').get((req, res) => {
    Student.find()
        .then(allStudents => {
            res.json({
                arrayOfStudents: allStudents
            })
        })
        .catch(err => console.log(err))
});


module.exports = router;