import express from "express"
import authController, { signIn, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

//Authentication endpoint
router.post("/signUp", authController)
router.post("/signIn", signIn)
router.get("/signOut", signOut)

export default router