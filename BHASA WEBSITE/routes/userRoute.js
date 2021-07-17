const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs'); //Password hash
const jwt = require('jsonwebtoken'); //token generator

const upload = require("../middleware/fileupload");

/*** bulk export of the route ***/
const router = new express.Router();
const verifyUser = require('../middleware/auth');

//Register System
router.post('/user/register', verifyUser.verifyUser, function(req, res) {
    const un = req.body.username;
    const em = req.body.email;
    const pw = req.body.password;

    bcrypt.hash(pw, 10, function(err, hash1) {

        const data = new userModel({ username: un, email: em, password: hash1 });
        data.save()
            .then(function(result) {
                res.status(201).json({ message: "Registered successfully" });
            })
            .catch(function(error) {
                res.status(500).json({ message: error })
            })
    })
    //const cpw = req.body.confirmpassword;
})


//data update in
router.put('/user/update', function(req, res) {
    const id = req.body.id;
    const profile_pic = req.body.profile_pic;
    userModel.updateOne({ _id: id }, { profile_pic: profile_pic })
        .then(function(result) {
            res.status(201).json({ message: "Profile Picture Updated!" })
        })
        .catch(function(error) {
            res.status(500).json({ message: error })
        });
})

/***** LOGIN SYSTEM *****/

router.post('/user/login', function(req, res) {

    /*** FIRST, WE NEED USERNAME AND PASSWORD FROM CLIENT ***/
    const username = req.body.username;
    const password = req.body.password;

    /*** SECOND, WE NEED TO CHECK IF THE USERNAME EXIST OR NOT ***/
    userModel.findOne({ username: username })
        .then(function(userData) {
            //all the data of username is now in the variable userData
            if (userData === null) {
                //if the username not found.that means they are invalid users!!
                return res.status(403).json({ message: "Invalid Credentials!" })
            }
            //valid users in terms of username
            //now compare the stored password with the given password
            bcrypt.compare(password, userData.password, function(err, result) {
                if (result === false) {
                    //if password is incorrect...
                    return res.status(403).json({ message: "Invalid Credentials!" })
                }
                //if both username and password are correct...

                //Now we need to create a token...
                const token = jwt.sign({ userId: data._id }, 'anysecretkey')
                res.status(200).json({ token: token, message: "Auth Success" })
            })
        })
        .catch()
})


//Photo upload
router.post("/profile/upload", upload.single("myimage"), function (req, res) {
    if (req.file == undefined) {
        return res.status(400).json({message : "only png/jpeg/gif files are allowed!"})
    }
    const data = new userModel({
        profile_pic: req.file.filename,
    })
    data.save()
        .then(function (result) {
            res.status(201).json({ message: "Profile Picture Uploaded!" });
        })
        .catch(function (error) {
            res.status(500).json({ message: error });
        });
});

//exporting router
module.exports = router;