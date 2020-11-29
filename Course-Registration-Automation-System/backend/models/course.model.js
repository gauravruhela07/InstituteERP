var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    semester_num: { type: String, required: true },
    course_id: { type: String, required: true, unique: true },
    course_name: { type: String, required: true },
    department: { type: String, required: true },
    elective: { type: String, required: true },
    dept_alloted: { type: String, required: true },
    L :{type: String, required: true},
    T : {type: String, required: true},
    P : {type: String, required: true},
    C : {type: String, required: true}
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;