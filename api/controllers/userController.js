const express = require('express')
const app = express()

app.use(express.json())

//@desc Registers the user
//@route /register
//@access public
const registerUser = (req, res) => {
    // const {username, password} = req.body; 
    // console.log(username, password); 
    res.status(200).json({"message": req.body})
}

module.exports = {registerUser};