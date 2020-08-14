const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
// Collection'u yarattık ve Schema ekledik.
const User = mongoose.model('User', UserSchema);

module.exports = User;