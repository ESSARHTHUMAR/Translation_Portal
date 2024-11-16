import express from "express"
import authController, { signIn } from "../controllers/auth.controller.js";

const router = express.Router();

//Authentication endpoint
router.post("/signUp", authController)
router.post("/signIn", signIn)

export default router