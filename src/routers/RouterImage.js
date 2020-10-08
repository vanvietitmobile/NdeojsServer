const express = require("express");
const router = express.Router();
const controllerPorduct = require("../controller/TestImage");
const multer = require("../config/multers");
const image = ()=>{
    router.post("/add-image",multer.array("images"),controllerPorduct.createImage);
    return router;
}
module.exports = image;
