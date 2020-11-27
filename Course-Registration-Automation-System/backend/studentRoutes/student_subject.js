const router = require('express').Router();
const checkAuth = require('../middleware/check_auth_student');

const Student = require('../models/student.model');
const Student_Subject = require('../models/student_subject.model');
const Course = require('../models/course.model');
const StudentFeesRecord = require('../models/student_fees_record.model');

// Inserting students' course name with course id into the database
// checkAuth will check whether client has sent valid token or not
router.post('/add', checkAuth, (req, res) => {   

    const roll_num = req.body.roll_num;
    const course_id = req.body.course_id;
    const course_name = req.body.course_name;
    const semester_num = req.body.semester_num;

    var newStudent_Subject = new Student_Subject({
        roll_num:roll_num,
        semester_num:semester_num,
        course_id:course_id,
        course_name:course_name
    });

    newStudent_Subject.save()
    .then(() => res.json('Student Subject Added!'))
    .catch(err => res.status(400).json('Error: '+res))
})

router.post('/registerWithElective', checkAuth, (req, res) => {
    var len = req.body.course_id_list.length;
    console.log(req.body);
    for(var i=0; i<len; i++) {
        var newStudent_Subject = new Student_Subject({
            roll_num:req.body.roll_num,
            semester_num:req.body.semester_num,
            course_id:req.body.course_id_list[i],
            course_name:req.body.course_name_list[i]
        })
        newStudent_Subject.save()
    }
    const query = {roll_num:req.body.roll_num};
    const args = {$set: {"has_registered": req.body.hasRegistered}};
    Student.updateOne(query, args)
    .then(student => {
        res.json('Successful!')
    })
    .catch(err => res.status(400).json('Error: '+res));
});

router.post('/upload_fees', checkAuth, (req, res) => {
    var fees_type = "semester_fee";
    console.log(req.body);
    var newFeesRecord = new StudentFeesRecord({
        roll_num:req.body.roll_num,
        semester_num:req.body.semester_num,
        transaction_id:req.body.semester_transaction_id,
        amount:req.body.semester_amount,
        fee_type:fees_type
    });
    console.log(newFeesRecord);
    newFeesRecord.save()
    .then(() => {
        console.log(fees_type);    
        var mess_type = "mess_fee";
        var newFeesRecord1 = new StudentFeesRecord({
            roll_num:req.body.roll_num,
            semester_num:req.body.semester_num,
            transaction_id:req.body.mess_transaction_id,
            amount: req.body.mess_amount,
            fee_type: mess_type
        });
        newFeesRecord1.save()
        .then(() => res.json('Successful!'))
        .catch(err => res.status(400).json('Error: '+res));
    })
    .catch(err => res.status(400).json('Error: '+res));
});

// fectching student details 
router.post('/detail', checkAuth, (req, res) => {
    const email=req.body.email;
    const query = {email: {$eq: email}};
    Student.find(query)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: '+res));
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

router.post('/current_sem_courses', checkAuth, (req, res) => {
    const roll_num = req.body.roll_num;
    const query = {roll_num: {$eq: roll_num}};
    Student_Subject.find(query)
    .then(student_subject => {
        var max_sem = 0;
        student_subject.forEach((msg) => {
            if(msg.semester_num>max_sem){
                max_sem=msg.semester_num;
            }
        });
        var curr_sem = Number(max_sem)+1;
        const query1 = {semester_num: {$eq:curr_sem.toString()}};
        Course.find(query1)
        .then(courses => {
            // console.log(courses);
            res.json(courses);
        })
        .catch(err => res.status(400).json('Error: '+res));
    })
    .catch(err => res.status(400).json('Error '+res));
})

router.post('/checkRegisteration', checkAuth, (req, res) => {
    const roll_num = req.body.roll_num;
    const query = {roll_num: {$eq: roll_num}};
    Student.find(query)
    .then(student => {
        res.json(student[0].has_registered);
    })
    .catch(err => res.status(400).json('Error: '+res));
})

router.post('/current_sem', checkAuth, (req, res) => {
    const roll_num = req.body.roll_num;
    const query = {roll_num: {$eq: roll_num}};
    Student_Subject.find(query)
    .then(student_subject => {
        var max_sem = 0;
        student_subject.forEach(msg => {
            if(msg.semester_num>max_sem){
                max_sem=msg.semester_num;
            }
        });
        max_sem = (Number(max_sem)+1).toString();
        res.json(max_sem);
    })
    .catch(err => res.status(400).json('Error: '+res));
})


module.exports = router;