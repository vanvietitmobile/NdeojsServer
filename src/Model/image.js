const mongoosee = require("mongoose");
const array = require("../config/multers");
const postusSchema = new mongoosee.Schema({
  image: {
    type: Array,
  },
});
const post = mongoosee.model("Image", postusSchema);
module.exports = post;
