const express = require('express');
const Admin = require('../models/adminModel');

/*** bulk export of the route ***/
const router = new express.Router();

router.get('/admins', function(req, res) {
    Admin.find()
        .then(function(data) {
            res.send(data)
        })
        .catch(function(err) {
            res.status(500).json({ message: err })
        })
})

router.post('/register', (req, res) => {
        const users = new Admin({
           name: req.body.name,
           email: req.body.email,
           password:req.body.password
        });

        Admin.create(users).then(function(userData){
           res.send(userData)
       })

})

router.put('/admin/update', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    Admin.updateOne({ _id: id }, { name: name })
        .then(function(result) {
            res.send(result)
        })
        .catch(function(error) {
            res.status(500).json({ message: error })
        });
})

router.delete('/admin/delete', function(req, res) {
    
    const id = req.body.id; 

    Admin.deleteOne({ _id: id })
        .then(function(result) {
            res.status(201).json({ message: "Product deleted" });
        })
        .catch(function(err) {
            res.status(500).json({ message: err })
        })
})

//exporting router
module.exports = router