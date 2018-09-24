var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    authId: { type: String, required: true },
    age: { type: Number, required: true },
    marriageStatus: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);