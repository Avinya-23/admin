const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
const db = process.env.database;

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log("error connecting database", err);
  });

const customerRouter = require("./routes/customerRouter");
const productRouter = require("./routes/productRouter");
app.use("/api/v1/auth/customer", customerRouter);
app.use("/api/v1/product", productRouter);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`local host connected successfully on port: ${port}`);
});
