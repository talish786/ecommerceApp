import express from "express";

const router = express.Router();

import {
  userLogin,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  removeUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";
router.get("/", protect, admin, getUsers);
router.delete("/remove/:id", protect, admin, removeUser);
router.post("/login", userLogin);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/create", registerUser);

router.get("/getUser/:id", protect, admin, getUserById);
router.put("/updateUser/:id", protect, admin, updateUser);

export default router;
