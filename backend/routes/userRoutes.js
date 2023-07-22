import express from "express";

const router = express.Router();

import {
  userLogin,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";
router.get("/", protect, admin, getUsers);
router.post("/login", userLogin);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/create", registerUser);

export default router;
