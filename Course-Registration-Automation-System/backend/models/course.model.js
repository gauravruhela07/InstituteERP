var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    semester_num: { type: String, required: true },
    course_id: { type: String, required: true, unique: true },
    course_name: { type: String, required: true },
    department: { type: String, required: true },
    elective: { type: String, requires: true },
    dept_alloted: { type: String, requires: true },
    L: {type: String, requires: true},
    T: {type: String, requires: true},
    P: {type: String, requires: true},
    C: {type: String, requires: true},
    faculties: { type: String, requires: true }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;