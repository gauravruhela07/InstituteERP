var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentFeesRecordSchema = new Schema({
    roll_num: { type: String, required: true },
    semester_num: { type: String, required: true },
    semester_transaction_id_student: { type: String, default: null },
    mess_transaction_id_student: { type: String, default: null },
    semester_transaction_id_finance: { type: String, unique: true, default: null },
    mess_transaction_id_finance: { type: String, unique: true, default: null },
    department: { type: String, required: true, default: null }
});

const StudentFeesRecord = mongoose.model('student_fees_record', StudentFeesRecordSchema);

module.exports = StudentFeesRecord;