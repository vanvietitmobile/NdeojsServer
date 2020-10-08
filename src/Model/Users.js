const mongosee = require("mongoose");
const userSchema = new mongosee.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  hash: {
    type: String,
  },
  birthday:{
  type: String,
},
  phone:{
    type: String,
  },
  address:{
    type: String,
  },
  image: {
    type: String,
  },
  permission: {
    type: Boolean,
  },
});
const User = mongosee.model("User", userSchema);
module.exports = User;
