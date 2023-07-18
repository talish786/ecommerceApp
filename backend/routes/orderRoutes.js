import express from "express";

const router = express.Router();

import { addOrderItems, getOrderById } from "../controllers/orderController.js";

import { protect } from "../middlewares/authMiddleware.js";

router.route("/create").post(protect, addOrderItems);
router.route("/getOrder/:id").get(protect, getOrderById);

export default router;
