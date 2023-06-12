import express from "express";

const router = express.Router();

import {
  userLogin,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

router.post("/login", userLogin);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/create", registerUser);

export default router;
