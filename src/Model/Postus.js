const mongoosee = require("mongoose");
const postusSchema = new mongoosee.Schema({
  email: {
    type: String,
  },
  fullname: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});
const post = mongoosee.model("Postus",postusSchema);
module.exports = post;
