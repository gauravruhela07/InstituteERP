var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentFeesRecordSchema = new Schema({
    roll_num: {type:String, required:true},
    semester_num: {type:String, required:true},
    transaction_id: {type:String, required:true, unique:true},
    amount: {type:String, required:true},
    fee_type: {type:String, required:true}
});

const StudentFeesRecord = mongoose.model('student_fees_record', StudentFeesRecordSchema);

module.exports = StudentFeesRecord;