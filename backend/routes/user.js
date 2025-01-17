const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { setUser, getUser } = require('../authservice');


router.post('/signup', async (req, res)=>{
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create
       ({ username: req.body.username,
        email: req.body.email,
        password: hashPassword});
        // console.log(user);

        user.save().then((data)=>{
           return res.status(200).json(data);
        }).catch((error)=>{
           return res.status(400).json(error);
        });
})

router.post('/login', async (req, res)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword){
        return res.json({message: "Invalid Password"});
    }
    const token =  setUser(user);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Ensure it's true in production
        sameSite: 'None', // Allow cross-site cookies
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (optional, here set to 1 day
        path: '/', // Adjust the path as needed
        // domain: 'admirable-quokka-c4bf0c.netlify.app', // Set your domain
        partitioned: true // If required by browser policies
    });
    
    return res.status(200).json({token});
})

router.get('/token/:token', async (req, res)=>{
    const token = req.params.token;
    const user = getUser(token);
    // console.log(user.user);
    return res.json(user.user);
})

router.get("/username/:username", async (req, res)=>{
    const username = req.params.username;
    const user = await User.findOne({username: username});
    // console.log("hi"+user);
    if(!user){
        return res.json({message: "User not found"});
    }
    return res.json(user);
})

router.get('/allusers/contact', async (req, res)=>{
    const users = await User.find({});
    return res.json(users);
})

module.exports = router;