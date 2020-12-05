var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentFeesRecordSchema = new Schema({
    roll_num: {type:String, required:true},
    semester_num: {type:String, required:true},
    semester_transaction_id_student: {type:String, required:true, unique:true},
    semester_transaction_id_finance: {type:String, required:true, unique:true},
    mess_transaction_id_student: {type:String, required:true, unique:true},
    mess_transaction_id_finance: {type:String, required:true, unique:true}
});

const StudentFeesRecord = mongoose.model('student_fees_record', StudentFeesRecordSchema);

module.exports = StudentFeesRecord;