const router = require('express').Router();
let Teaches = require('../models/teaches.model');
const mongoose = require('mongoose');
const axios = require('axios');


// post means to add something to the server
router.route('/addFacultyCou').post((req, res) => {
    var mapp = JSON.parse(req.body.mapp);

    // console.log(Object.keys(mapp).length);
    let p = new Promise((resolve, reject) => {
        counter = 0;
        for (const faculty_name of Object.keys(mapp)) {
            // console.log(faculty_name);
            axios.post('/faculty/getFacultyId', { faculty_name: faculty_name })
                .then(result => {
                    var name = result.data.name;
                    var faculty_id = String(result.data.faculty_id);
                    // console.log(name + " " + faculty_id);
                    return { "name": name, "faculty_id": faculty_id };
                })
                .then((result) => {
                    var courseArray = mapp[faculty_name];
                    var courseidString = "";
                    var coursenameString = "";
                    var i;
                    var faculty_id = result["faculty_id"];
                    for (i = 0; i < courseArray.length; i++) {
                        var course = courseArray[i];
                        courseidString = courseidString + "," + course["course_id"];
                        coursenameString = coursenameString + "," + course["course_name"];
                    }
                    const faculty_teaches = new Teaches({ "faculty_id": faculty_id, "course_id": courseidString, "course_name": coursenameString })
                    // console.log(faculty_teaches);
                    faculty_teaches.save()
                        .then(() => { counter++; return counter })
                        .then((counter) => {
                            // console.log("counter", counter);
                            // console.log();
                            if (counter == Object.keys(mapp).length - 1) {
                                resolve()
                            }
                        })
                        .catch(err => reject())
                })
                .catch(err => { console.log("error present at counter ", counter); reject() })
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

module.exports = router;
