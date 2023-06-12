import express from "express";
import {
  getAllProducts,
  getProductsById,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getAllProducts());

router.route("/:id").get(getProductsById());

export default router;
