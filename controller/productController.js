const express = require("express");
const router = express.Router();
const Product = require("./../models/Product");
// const CryptoJS = require("crypto-js"); /*Used for hashing the password*/
const jwt = require("jsonwebtoken");
const secretKey = "kamran";
const loginData = require("../middleware/loginData");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// CREATE PRODUCT
module.exports.addProduct = async (req, res) => {
  //   const newProduct = new Product(req.body);
  //   newProduct.save();
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
  });

  newProduct.save();
  console.log(newProduct);
  try {
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ "error in creating product": error });
  }
};

module.exports.imageUploadController = async (req, res) => {
  // console.log("Image details", req.files);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log("Uplaod Image", result);
    res.json({
      url: result.secure_url,
      // public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

// // GET
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json({ "error in getting product ": err });
//   }
// });

// // GET ALL PRODUCT
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;
//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ "error in getting user ": err });
//   }
// });

// module.exports = router;
