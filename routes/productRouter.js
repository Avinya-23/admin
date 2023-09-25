const express = require("express");
const loginData = require("./../middleware/loginData");
const router = express.Router();
const product = require("../controller/productController");
const upload = require("../middleware/image");
const expressFormidable = require("express-formidable");
// const imageUploadController = require("../controller/productController")
router.route("/addProduct").post(product.addProduct);
router
  .route("/upload-image")
  .post(
    expressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
    product.imageUploadController
  );

module.exports = router;
