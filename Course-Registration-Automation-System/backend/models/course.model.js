var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    semester_num : {type:String, required: true},
    course_id : {type:String, required:true, unique:true},
    course_name : {type:String, required:true},
    department : {type:String, required:true},
    elective: {type:Boolean, default: false}
});

const Course = mongoose.model('Semester', CourseSchema);

module.exports = Course;