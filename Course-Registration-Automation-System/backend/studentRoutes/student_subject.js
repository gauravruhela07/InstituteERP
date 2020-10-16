const router = require('express').Router();
const checkAuth = require('../middleware/check_auth_student');

let Student_Subject = require('../models/student_subject.model');

// Inserting students' course name with course id into the database
// checkAuth will check whether client has sent valid token or not
router.post('/add', checkAuth, (req, res) => {

    const roll_num = req.body.roll_num;
    const course_id = req.body.course_id;
    const course_name = req.body.course_name;
    const semester_num = req.body.semester_num;

    var newStudent_Subject = new Student_Subject({
        roll_num,
        semester_num,
        course_id,
        course_name
    });

    newStudent_Subject.save()
    .then(() => res.json('Student Subject Added!'))
    .catch(err => res.status(400).json('Error: '+res))
})

// fetching subjects of student semester-wise
router.get('/show', checkAuth, (req, res) => {
    const semester_num = req.body.semester_num;
    const roll_num = req.body.roll_num;

    const query = { semester_num: {$eq: semester_num}, roll_num: {$eq: roll_num}};

    Student_Subject.find(query)
    .then(student_subject => res.json(student_subject))
    .catch(err => res.status(400).json('Error: '+res));
})


module.exports = router;