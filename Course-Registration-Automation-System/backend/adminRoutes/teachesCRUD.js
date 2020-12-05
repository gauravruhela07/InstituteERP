const router = require('express').Router();
let Teaches = require('../models/teaches.model');
const mongoose = require('mongoose');
const axios = require('axios');



// router.route('/getAdmin').post((req, res) => {
//     const adminId = req.body.adminId;
//     console.log(adminId);
//     Faculty.find({ 'faculty_id': adminId })
//         .then(admins => res.json(admins))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


// post means to add something to the server
router.route('/addFacultyCou').post((req, res) => {
    var mapp = JSON.parse(req.body.mapp);

    for (const faculty_name of Object.keys(mapp)){
        axios.post('http://localhost:5000/faculty/getFacultyId', {faculty_name: faculty_name})
            .then(result => {
                // console.log(result.data);
                var name = result.data.name;
                var faculty_id = String(result.data.faculty_id);
                console.log(name+" "+faculty_id);
                return {"name": name, "faculty_id": faculty_id};
            })
            .then((result) => {
                var courseArray = mapp[faculty_name];
                var courseidString = "";
                var coursenameString = "";
                var i;
                var faculty_id = result["faculty_id"];
                for (i=0;i<courseArray.length;i++){
                    var course = courseArray[i];
                    courseidString = courseidString+","+course["course_id"];
                    coursenameString = coursenameString+","+course["course_name"];
                }
                const faculty_teaches = new Teaches({"faculty_id": faculty_id, "course_id": courseidString, "course_name": coursenameString})
                faculty_teaches.save()
                    .then(() => {
                        // console.log(faculty_name, " ", faculty_id, " ", courseidString, " ", coursenameString, " saved");
                        console.log("ff");
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
});

module.exports = router;
