const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const loginData = (req, res, next) => {
  //    To get the id from the auth token
  const token = req.header("token");
  console.log(token, "lolo");
  if (!token) {
    res.status(401).json("Please authenticate using a valid token");
    return;
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (!data) {
      res.status(404).json("error in data");
    }
    req.customer = data.customer;
    console.log(req.customer, 321);

    next();
  } catch (error) {
    res.status(400).json("Error from middleware authentication");
  }
};

module.exports = loginData;
