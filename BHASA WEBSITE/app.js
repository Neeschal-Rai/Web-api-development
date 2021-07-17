const express = require('express');


const mongoose = require("mongoose"); // 
require('./database_con/database');
const userRoute = require('./routes/userRoute');
const courseRoute = require('./routes/courseRoute');

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(userRoute);
app.use(courseRoute);

app.listen(90);


// const fs = require("fs");
// const http = require("http");

// //for reading the json file
// const collegeJson = fs.readFileSync("test.json");
// const stringJson =  collegeJson.toString();

// const data = JSON.parse(stringJson);

// // function sub(){
// //      console.log("we")
// // }

// http.createServer(function(req, res){
//      res.write(data.Name);
//      res.write(data.Address);
//      res.write(data.Phone_no);
//      res.end()
// }).listen(90)

// const express = require("express");
// const app  = express();

// app.get("/event", function(req, res){
//      res.send("This is nothing")
// })

// app.listen(90);
// const hbs = require('hbs');
// const app = express();
// const path = require('path');

// const partialFile = path.join(_dirname, 'partials');

// app.set('view engine', 'hbs');

// app.get('/', function(req, res){
//      res.render('home', {
//           username : ["Nischal","ho"],
//           age : "9879",
//           address : "cannot tell"
//      });lkj8lkjhgtfd 
// })

// app.get('/user/fetch', function(req, res){
//     res.json({
//          message : "hi"
//     })
// })

// app.delete('/user/delete/userid', function(req, res){
//      const id11 = req.params.userid;
//      Users.deleteOne({_id:id11}).then(function(){
//           res.send('deleted')
//      })
// })