const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Please enter username"], 
        min: 4,
        unique: true
    },
    password: {
        type: String, 
        required: [true, "Please enter password"], 
    }
})

module.exports = mongoose.model('User', userSchema); 