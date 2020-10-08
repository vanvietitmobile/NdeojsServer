const userModel = require("../Model/Users");
const hash_pwd = require("../config/hash-bash");
const nodemailer = require("nodemailer");

exports.register_account = async (req, res) => {
  await userModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) return done(err);
    if (user) {
      return res.send({
        status: false,
        message: "User already exists",
      });
    } else {
      new userModel({
        fullname: req.body.fullname,
        email: req.body.email,
        hash: hash_pwd.hash_input(req.body.hash),
        birthday: "chưa cập nhật",
        phone: "chưa cập nhật",
        address: "chưa cập nhật",
        image: "chưa cập nhật",
        permission: false,
      }).save((err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.send({
            status: true,
            message: "Success",
          });
        }
      });
    }
  });
};

exports.login_user = async (req, res) => {
  try {
    const AccountInfor = await userModel.findOne({ email: req.body.email });
    const status = {
      status: true,
      message: "Account successfully",
    };
    if (!AccountInfor) {
      let ObjectNew = {
        status: false,
        message: "Account not found",
      };
      res.send(ObjectNew);
    } else {
      if (hash_pwd.hash_output(AccountInfor.hash) == req.body.hash) {
        let data = { ...AccountInfor._doc };
        res.send({
          ...status,
          data,
        });
      } else {
        const ObjectNew = {
          status: false,
          message: "wrong password",
        };
        res.send(ObjectNew);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.get_Key = async (req, res) => {
  try {
    const AccountInfor = await userModel.findOne({ email: req.body.email });
    userModel
      .find()
      .lean()
      .exec((error, datas) => {
        if (AccountInfor.permission) {
          let data = datas.filter((datas) => {
            return datas.permission == false;
          });
          data.reverse();
          res.send({ ...AccountInfor._doc, data });
        } else {
          let data = [{ data: null }];
          res.send({ ...AccountInfor._doc, data });
        }
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.edit_user_by_id = async (req, res) => {
  await userModel.findByIdAndUpdate(
    { _id: req.body._id },
    {
      fullname: req.body.fullname,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      image: req.body.image,
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ status: true, message: "Success" });
      }
    }
  );
};
exports.rest_passwords = async (req, res) => {
  try {
    const UserEmail = await userModel.findOne({ email: req.body.email });
    if (!UserEmail) {
      const status = { status: false, message: "Email not found" };
      res.send(status);
    } else {
      const request_code = Math.floor(100000 + Math.random() * 900000);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lykuteo123@gmail.com",
          pass: "vietpro110",
        },
      });
      let mailOptions = {
        from: "lykuteo123@gmail.com",
        to: req.body.email,
        subject: "We is already send you the code to retrieve the password",
        text:
          "Code of you are\n" +
          request_code +
          "\nThank you for using our service me",
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email send" + data.response);
        }
      });
      res.send({
        status: true,
        message: "send email successfully",
        request_code: request_code,
        data: UserEmail,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.change_password = async (req, res) => {
  await userModel.findByIdAndUpdate(
    { _id: req.body._id },
    {
      hash: hash_pwd.hash_input(req.body.hash),
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: true,
          message: "Has been successfully changed",
        });
      }
    }
  );
};
exports.getUser_ID = async (req, res) => {
  const user = await userModel.findOne({ _id: req.body._id });
  if (!user) {
    res.send({ status: false, message: "User not found" });
  } else {
    res.send(user);
  }
};
