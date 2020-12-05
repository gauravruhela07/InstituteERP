const router = require('express').Router();
let StudentSub = require('../models/student_subject.model');
const mongoose = require('mongoose');

router.route('/getLatestSemesterNoOfRollNo').post((req, res) => {
    var roll_num = String(req.body.roll_num);
    console.log("roll num"+String(roll_num));
    // StudentSub.find({"roll_num": roll_num}, 'semester_num')
    //     .then(result => res.json({
    //         semester_num: result
    //     }))
    //     .catch(err => console.log(err))
    var query = 
        [
            {$match: {roll_num: roll_num}},
          {
            $group:
              {
                _id: "$roll_num",
                maxSem: { $max:"$semester_num"},
              }
          }
        ]
    StudentSub.aggregate(query)
        .exec()
        .then((result) => {
            console.log(result);
            if (result.length>0){
                var maxSemForThisRoll = result[0]["maxSem"];
                res.json({
                    message: "Successful",
                    maxSemester: maxSemForThisRoll
                })}
            else{
                res.json({
                    message: "Unsuccessful"
                })
            }
        })
});

router.route('/add').post((req, res) => {
    var array = req.body;
    console.log(array);

    const roll_num = array["roll_num"]
    const semester_num = array["semester_num"]
    const course_name = array["course_name"]
    const course_id = array["course_id"]

    const studSub = new StudentSub({"roll_num": roll_num, "semester_num": semester_num, "course_name": course_name, "course_id": course_id})

    studSub.save()
        .then(() => res.json({
            message: "Successful addition"
        }))
        .catch(err => console.log(err))
})

module.exports = router;