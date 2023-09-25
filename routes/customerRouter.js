const express = require("express");
const loginData = require("./../middleware/loginData");
const router = express.Router();
const customerController = require("../controller/customerController");
router.route("/register").post(customerController.registerCustomer);
router.route("/login").post(customerController.login);
router.route("/loginData").get(loginData, customerController.loginData);
// router.get("/:id", loginData, customerController.getUserData);
module.exports = router;
