var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FacultySchema = new Schema({
    name: { type: String, required: true },
    faculty_id: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    admin: { type: Boolean, default: false },
    HOD: { type: Boolean, default: false }
});

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;