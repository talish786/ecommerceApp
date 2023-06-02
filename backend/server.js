import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `App Is running in ${process.env.NODE_ENV} on ${PORT} port`.yellow.bold
  )
);
