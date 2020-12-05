var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminCredSchema = new Schema({
    adminId: { type: String, required: true },
    adminPassword: { type: String, required: true }
});

const AdminCred = mongoose.model('AdminCred', AdminCredSchema);

module.exports = AdminCred;