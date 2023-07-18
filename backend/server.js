import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(
  PORT,
  console.log(
    `App Is running in ${process.env.NODE_ENV} on ${PORT} port`.yellow.bold
  )
);
