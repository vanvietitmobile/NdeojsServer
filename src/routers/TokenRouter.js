const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const login = () => { 
    router.post("/getToken-firebase",loginController.getToken);
    router.post("/create-firebase", loginController.createLogin);
  return router;
};
module.exports=login;