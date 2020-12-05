const router = require('express').Router();
let Fee = require('../models/student_fees_record.model');
const mongoose = require('mongoose');


router.route('/addFinanceDeptFee').post((req, res) => {
    const arrayOfFee = req.body.theArray;
    var i;

    let p = new Promise((resolve, reject) => {
        counter = 0;
        for (i = 0; i < arrayOfFee.length; i++) {
            var fee = arrayOfFee[i];
            const roll_num = fee["roll_num"];
            const semester_num = fee["semester_num"];
            const department = fee["department"];
            const semester_transaction_id_finance = fee["semester_transaction_id_finance"];
            const mess_transaction_id_finance = fee["mess_transaction_id_finance"];


            const newFee = new Fee({ "roll_num": roll_num, "semester_num": semester_num, "department": department, "semester_transaction_id_finance": semester_transaction_id_finance, "mess_transaction_id_finance": mess_transaction_id_finance, "semester_transaction_id_student": String(i), "mess_transaction_id_student": String(i) });
            // console.log(newFee);
            newFee.save()
                .then(() => {
                    counter++;
                    return counter;
                })
                .then((counter) => {
                    if (counter == arrayOfFee.length - 1) {
                        resolve()
                    }
                })
                .catch(() => reject())
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

router.route('/getAllFeeDetails').get((req, res) => {
    Fee.find()
        .then(allFees => {
            res.json({
                arrayOfFees: allFees
            })
        })
        .catch(err => console.log(err))
});

module.exports = router;