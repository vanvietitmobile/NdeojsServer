const express = require("express");
const router = express.Router();
const controllerPorduct = require("../controller/PostusController");
const multer = require("../config/multers");




const postus = () => {
  router.post("/api/create-product",multer.single("upload"), controllerPorduct.create_product);
  router.get("/api/get-all-product", controllerPorduct.get_product);
  router.post("/api/change-active", controllerPorduct.change_Active);
  router.post("/api/get-product-user", controllerPorduct.get_product_check_unapproved);
  router.post("/api/delete-product",controllerPorduct.delete_product);
  router.post("/api/getID-product", controllerPorduct.get_product_id);
  router.post("/api/update-product",multer.single("upload"), controllerPorduct.edit_product);

  return router;
};
module.exports = postus;
