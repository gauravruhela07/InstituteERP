const router = require('express').Router();
let Fee = require('../models/student_fees_record.model');
const mongoose = require('mongoose');


router.route('/addFinanceDeptFee').post((req, res) => {
    const arrayOfFee = req.body.theArray;
    // console.log(arrayOfFee);
    // console.log(arrayOfFee.length);
    var i;
    for(i=0;i<arrayOfFee.length;i++){
        var fee = arrayOfFee[i];
        const roll_num = fee["roll_num"];
        const semester_num = fee["semester_num"];
        const semester_transaction_id_finance = fee["semester_transaction_id_finance"];
        const mess_transaction_id_finance = fee["mess_transaction_id_finance"];
        

        const newFee = new Fee({ "roll_num": roll_num, "semester_num":semester_num, "semester_transaction_id_finance": semester_transaction_id_finance, "mess_transaction_id_finance": mess_transaction_id_finance, "semester_transaction_id_student": i, "mess_transaction_id_student": i});
        console.log(newFee);
        newFee.save()
    }
});

router.route('/getAllFeeDetails').get((req,res) => {
    Fee.find()
        .then(allFees => {
            res.json({
                arrayOfFees: allFees
            })
        })
        .catch(err => console.log(err))
});

module.exports = router;