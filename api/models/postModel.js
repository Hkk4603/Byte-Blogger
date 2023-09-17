const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    title:String,
    summary:String,
    content:String, 
    cover:String, 
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postModel); 