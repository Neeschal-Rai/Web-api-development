const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  course_pic: {
    type: String,
  },
  coursename: {
    type: String,
  },
  coursedesc: {
    type: String,
  },
});
const users = mongoose.model("coursetable", courseSchema);

module.exports = users;
