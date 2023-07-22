import express from "express";

const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middlewares/authMiddleware.js";

router.route("/create").post(protect, addOrderItems);
router.route("/getOrder/:id").get(protect, getOrderById);
router.route("/pay/:id").put(protect, updateOrderToPaid);
router.route("/myorders").get(protect, getMyOrders);

export default router;
