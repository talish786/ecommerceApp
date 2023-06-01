import express from "express";
import products from "./data/products.js";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `App Is running in ${process.env.NODE_ENV} on ${PORT} port`.yellow.bold
  )
);
