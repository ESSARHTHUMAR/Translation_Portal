import express from "express"
import authController from "../controllers/auth.controller.js";

const router = express.Router();

//Authentication endpoint
router.post("/signUp", authController)

export default router