const Customers = require("./../models/Customers");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.registerCustomer = async (req, res) => {
  try {
    let success = false;

    const { email, phone, password } = req.body;

    const emailExist = await Customers.findOne({ email });
    const phoneExist = await Customers.findOne({ phone: req.body.phone });

    if (emailExist || phoneExist) {
      res.status(404).json("Customer already exists");
      // return "customer already exist";
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    customer = new Customers({
      email,
      phone,

      password: secPass,
    });
    customer = await customer.save();
    const data = {
      customer: {
        id: customer.id,
      },
    };
    success = true;
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ success, token });
    //   now sending an otp to Customer as he is registering
  } catch (e) {
    return "error in registering";
  }
};

// Login

module.exports.login = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  const { email, password } = req.body;

  try {
    const customer = await Customers.findOne({ email });
    const pass = customer.password;

    if (!customer) {
      return res.status(400).json({ error: "invalid login credential" });
    }

    const passwordCompare = await bcrypt.compare(password, pass);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ error: "invalid login credential" });
    }

    const data = {
      customer: {
        id: customer.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken, "from login backend");
    success = true;
    res.status(200).json({
      success,
      authToken,
    });
  } catch (err) {
    // res.status(400).json({
    //   status: "error from login side",
    //   message: err,
    // });

    return "error in logiin";
    console.log(err);
  }
};

// LoginData
module.exports.loginData = async (req, res) => {
  try {
    let success = false;
    const customerId = req.customer.id;
    const customer = await Customers.findById(customerId).select("-password");
    console.log(customerId, 76767);
    console.log(customer, 8998);
    success = true;
    res.status(200).json({
      success,
      customer: customer,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// individual customer data
// // GET
// module.exports.getUserData = async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.params.id);
//     const { password, ...others } = customer._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json({ "error in getting product ": err });
//   }
// };
