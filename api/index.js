const express = require('express')
const dotenv = require('dotenv').config()
const connectDb = require('./config/dbConnection')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userModel');
const multer = require('multer'); // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')
const Post = require('./models/postModel')


connectDb();
const app = express()
app.use(express.json()) // for parsing json data -> result object
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })) // cross-origin-resource-sharing
const port = process.env.PORT

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password)

    // basic error handling
    if (!username || !password) {
        return res.status(400).json({ "message": "All fields are mandatory!" });
    }

    const hashed = await bcrypt.hash(password, 10);
    try {
        // be careful with the names of object keys which are passed into .create() method
        const user = await User.create({ username: username, password: hashed });
        return res.status(200).json({ "username": user.username, "password": user.password });
    } catch (err) {
        console.log(err);
    }

    res.status(400).json({ "message": "Registration not successful!" })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ "message": "User not registered!" });
    }

    if (await bcrypt.compare(password, user.password)) {
        jwt.sign({ username, id: user._id }, process.env.SECRET_KEY, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({username, id: user._id});
            // console.log('generated jwt')
        })
    } else {
        // console.log("password not matched")
        return res.status(401).json({ message: "Passwords not matched!" });
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    if(!token){
        return res.json({})
    }
    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Successfully Logged-out!')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    // saving file to uploads i.e., image
    // console.log(req.file); 
    const {originalname, path} = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)
    
    const {title, summary, content} = req.body
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, {}, async (err, info) => {
        if(err) throw err; 
        const newPost = await Post.create({title, summary, content, cover: newPath, author:info.id})
        res.json(newPost)
    })

})

app.get('/post', async (req, res) => {
    //  the populate in mongoDB allows you to seamlessly fetch and replace specified fields with the corresponding referenced documents.
    try{

        const posts = await Post.find({})
            .populate('author', ['username'])
            .sort({'createdAt': -1})
            .limit(20)
        if(posts){
            return res.status(200).json(posts)
        }
        res.status(404).json({"message" : "Posts not found!"})
    }catch(err){
        res.status(400).json({"message" : err})
    }
})

app.get('/post/:id', async (req, res) => {
    try{
        const {id} = req.params; 
        const post = await Post.findById(id).populate('author', ['username']); 
        res.json(post); 
    }catch(err){
        res.status(400).json({"message" : err})
    }

})

app.put('/post', uploadMiddleware.single('file') , async (req, res) => {
    let newPath = null; 
    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
    } 

    const {token} = req.cookies; 
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
        if(err) throw err; 
        const {title, summary, content, id} = req.body
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id); 
        if(!isAuthor){
            res.status(400).json({message: "you are not authorized to access this"}); 
            throw new Error("You are not authorized to access this");
        }    
        const editedPost = await Post.findByIdAndUpdate(id, {title, summary, content, cover: newPath ? newPath: postDoc.cover})
        res.json(editedPost)
    })
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})