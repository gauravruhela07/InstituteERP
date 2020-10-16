var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSubjectSchema = new Schema({
    roll_num: {type:String, required:true, unique:true},
    semester_num : {type:String, required: true},
    course_id : {type:String, required:true, unique:true},
    course_name : {type:String, required:true},
});

const Student_Subject = mongoose.model('Student_Subject', StudentSubjectSchema);

module.exports = Student_Subject;