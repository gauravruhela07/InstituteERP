var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeachesSchema = new Schema({
    faculty_id: { type: String, required: true },
    course_id: { type: String, required: true},
    course_name: { type: String, required: true },
});

const Teaches = mongoose.model('Teaches', TeachesSchema);

module.exports = Teaches;