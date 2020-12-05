const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    email : {type: String, 
        required:true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type:String, required:true},
    name: {type: String, required:true},
    department: {type:String, required:true}, 
    roll_num : {type:String, required:true, unique:true},
    has_registered: {type:String, default:"-1"}
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;