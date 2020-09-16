const router = require('express').Router();

let Semester = require('../models/semester.model')

// Inserting subjects into the database
router.route('/add').post((req, res) => {
    const semester_num = req.body.semester_num;
    const course_id = req.body.course_id;
    const course_name = req.body.course_name;
    
    // console.log(req);
    var newSemester = new Semester({
        semester_num,
        course_id,
        course_name
    });

    newSemester.save()
    .then(() => res.json('Sem Subject Added!'))
    .catch(err => res.status(400).json('Error: '+res));
});

// Fetching subjects semesterwise from the database
router.route('/show').get((req, res) => {

    const semester_num = req.body.semester_num;
    const query = { semester_num: { $eq: semester_num}};
    Semester.find(query)
    .then(semester => res.json(semester))
    .catch(err => res.status(400).json('Error: '+res));
});

module.exports = router;