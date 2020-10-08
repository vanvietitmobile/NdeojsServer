const LoginModel = require("../Model/login");

exports.getToken = async (req, res) => {
  const token = await LoginModel.findOne({ token: req.body.token });
  console.log(token);
  if (!token) {
    res.send({ status: false, Message: "Token is not available" });
  } else {
    res.send({ Status: true, Message: "Token is had available" });
  }
};
exports.createLogin = async (req, res) => {
    new LoginModel({
      photourl: req.body.photourl,
      name: req.body.name,
      email: req.body.email,
      token: req.body.token,
    }).save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ Status: true, Message:"Create Succecfully"});
      }
    });
}
    