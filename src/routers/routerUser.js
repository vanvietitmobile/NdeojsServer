const express = require("express");
const router = express.Router();
const multer = require("../config/multers");

//controller
const controllerUser = require("../controller/UsersControll");

const User = () => {
  router.post("/api/get-key-account", controllerUser.get_Key);
  router.post("/api/register-account/new", controllerUser.register_account);
  router.post("/api/login-account", controllerUser.login_user);
  router.post("/api/rest-account", controllerUser.rest_passwords);
  router.post("/api/getID-account", controllerUser.getUser_ID);
  router.post("/api/change-account", controllerUser.change_password);
  router.post("/api/edit-user",multer.single("upload"),controllerUser.edit_user_by_id);
  return router;
};

module.exports = User;
