const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: {},
      required: true,
    },
    categories: {
      type: String,
    },

    price: {
      type: String,
      required: true,
    },
    // inStock: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
