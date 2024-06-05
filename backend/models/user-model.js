const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        numberOfPhotos: Number,
        dateOfLastPhoto: Date,
        dateOfCreation: Date 
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;