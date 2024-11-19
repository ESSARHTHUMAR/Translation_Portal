

import express from "express";
import multer from "multer";
import {
  uploadFile,
  getUserFiles,
  getAllFiles,
  uploadTranslatedFile,
  downloadOriginalFile,
  downloadTranslatedFile,
  sendTranslatedFileByEmail
} from "../controllers/file.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", verifyToken, upload.single("file"), uploadFile);
router.get("/user/files", verifyToken, getUserFiles);
router.get("/admin/files", verifyToken, getAllFiles);
router.post("/admin/upload/:fileId", verifyToken, upload.single("file"), uploadTranslatedFile);
router.get("/admin/download/:fileId", verifyToken, downloadOriginalFile);
router.get("/download/translated/:fileId", verifyToken, downloadTranslatedFile);
router.post('/admin/send-translated-email/:fileId', verifyToken, sendTranslatedFileByEmail);


export default router;
