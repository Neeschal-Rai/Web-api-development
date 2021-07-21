const express = require("express");
const mongoose = require("mongoose"); //
require("./database_con/database");
const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const adminRoute = require("./routes/adminRoute");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoute);
app.use(userRoute);

app.listen(90);
