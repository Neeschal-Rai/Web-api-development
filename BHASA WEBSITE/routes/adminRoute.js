const express = require('express');
const adminModel = require('../models/adminModel');

/*** bulk export of the route ***/
const router = new express.Router();

router.get('/admin', function(req, res) {
    console.log('Admin page')
})

router.post('/admin', function(req, res) {
    console.log('this is admin')
})

router.put('/admin', function(req, res) {
    console.log('This is admin')
})

//exporting router
module.exports = router