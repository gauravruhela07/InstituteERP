var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SemesterSchema = new Schema({
    semester_num : {type:String, required: true},
    course_id : {type:String, required:true},
    course_name : {type:String, required:true},
});

const Semester = mongoose.model('Semester', SemesterSchema);

module.exports = Semester;