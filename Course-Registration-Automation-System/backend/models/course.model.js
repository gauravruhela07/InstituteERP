<<<<<<< HEAD
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    semester_num: { type: String, required: true },
    course_id: { type: String, required: true, unique: true },
    course_name: { type: String, required: true },
    department: { type: String, required: true },
    elective: { type: String, requires: true }
});

const Course = mongoose.model('Course', CourseSchema);

=======
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    semester_num : {type:String, required: true},
    course_id : {type:String, required:true, unique:true},
    course_name : {type:String, required:true},
    department : {type:String, required:true},
    elective: {type:Boolean, default: false}
});

const Course = mongoose.model('Course', CourseSchema);

>>>>>>> ef79dcb7be02361df4bb3692f0901c2a608635f0
module.exports = Course;