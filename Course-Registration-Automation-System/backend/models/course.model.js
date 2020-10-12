const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: { type: String, required: true, unique: true, trim: true },
    course_id: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true, unique: true, trim: true },
    elective: { type: Boolean, required: true, trim: true },
    semester_num: { type: Number, required: true, trim: true },
},
    { timestamps: true, }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;