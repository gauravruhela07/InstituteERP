const router = require('express').Router();
let Faculty = require('../models/faculty.model');
const mongoose = require('mongoose');


//get means to get something from the server and give it back to the client(user)
// give the admin all the faculties who are admin, done by admin to get all admins
router.route('/getAdmin').post((req, res) => {
    const adminId = req.body.adminId;
    // console.log(adminId);
    Faculty.find({ 'faculty_id': adminId })
        .then(admin => {
            console.log(admin);
            res.json(admin);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// post means to add something to the server
router.route('/add').post((req, res) => {
    var facultyArray = req.body.theArray;
    var i;
    for (i=0;i<facultyArray.length;i++){
        const name = facultyArray[i]["name"];
        const faculty_id = facultyArray[i]["faculty_id"];
        const department = facultyArray[i]["department"];
        const admin = facultyArray[i]["admin"];
        const hod = facultyArray[i]["HOD"];
        const advisor = facultyArray[i]["Advisor"];
        console.log(advisor);
        if (advisor==="yes"){
            const advisory_sem = facultyArray[i]["advisory_sem"];
            const advisory_branch = facultyArray[i]["advisory_branch"];
            const advisory_program = facultyArray[i]["advisory_program"];
            const advisorString = advisory_sem+","+advisory_branch+","+advisory_program;

            const faculty = new Faculty({ "name": name, "faculty_id": faculty_id, "department": department, "admin": admin, "HOD": hod, "Advisor": advisorString });

            faculty.save()
                .then(() => console.log('faculty added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
        else if(advisor==="no"){
            const faculty = new Faculty({ "name": name, "faculty_id": faculty_id, "department": department, "admin": admin, "HOD": hod, "Advisor": " "});

            faculty.save()
                .then(() => console.log('faculty added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }

    }
    
});


router.route('/getFacultyId').post((req, res) => {
    const name = req.body.faculty_name;

    var query = {"name": name}
    Faculty.find(query)
        .then(result => {
            // console.log(name+"  "+result+" "+typeof(result)+" "+Object.keys(result)[1]);
            // console.log(name);
            // console.log(result[0].faculty_id);
            // console.log(result.length);
            res.json({
                name: name,
                faculty_id: result[0].faculty_id
            })
            // res.json(result);
        })
        .catch(err => res.status(400).json('Error issssssssssssssssssss: ' + err));
});

router.route('/getAllFaculty').get((req, res) => {
    Faculty.find()
        .then((result) => {
            res.json({
                faculties: result
            })
        })
});




module.exports = router;