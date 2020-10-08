const mongoosee = require("mongoose");

const postusSchema = new mongoosee.Schema({
  photourl: {
    type: String,
  },
  name:{
      type: String,
  },
  email:{
      type: String,
      unique: true,
  },
  token:{
      type: String,
      unique: true,
  },

});
const post = mongoosee.model("login", postusSchema);
module.exports = post;
