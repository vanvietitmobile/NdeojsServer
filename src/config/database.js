const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://vanviet:123qwe@cluster0-vqv6x.mongodb.net/Networking?retryWrites=true&w=majority";
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.name}`);
};
module.exports = connectDB;
