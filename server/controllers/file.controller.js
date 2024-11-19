import File from "../models/file.model.js";
import errorHandler from "../utils/error.js";
import path from "path";
import fs from "fs";
import nodemailer from 'nodemailer';

// Upload a new file
export const uploadFile = async (req, res, next) => {
  const { fromLanguage, toLanguage, turnaroundTime, originalFilename } = req.body;

  try {
    // Check if file is uploaded
    if (!req.file) {
      return next(errorHandler(400, "File upload failed"));
    }

    // Construct the full file path
    const originalFileUrl = `uploads/${req.file.filename}`;

    const newFile = new File({
      userId: req.user.id,
      fromLanguage,
      toLanguage,
      turnaroundTime,
      originalFilename,
      originalFileUrl,
      status: "Uploaded",
    });

    await newFile.save();
    res.status(201).json({
      success: true,
      message: "File uploaded successfully!",
      file: newFile,
    });
  } catch (error) {
    next(error);
  }
};

// Get all files for a specific user (Customer Dashboard)
export const getUserFiles = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return next(errorHandler(400, "User ID is missing"));

    const files = await File.find({ userId });
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

// Get all files (Admin Dashboard)
export const getAllFiles = async (req, res, next) => {
  try {
    const files = await File.find().populate("userId", "username email");
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

// Admin uploading translated file
export const uploadTranslatedFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    if (!req.file) return next(errorHandler(400, "File upload failed"));

    const translatedFileUrl = `uploads/${req.file.filename}`;

    const file = await File.findByIdAndUpdate(
      fileId,
      { translatedFileUrl, status: "Completed" },
      { new: true }
    );
    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

// Download the original file
export const downloadOriginalFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      console.error("File not found in database");
      return res.status(404).json({ error: "File not found" });
    }

    // Construct the correct file path
    const filePath = path.resolve("uploads", path.basename(file.originalFileUrl));

    // Check if the file exists on the server
    if (!fs.existsSync(filePath)) {
      console.error("File not found on server");
      return res.status(404).json({ error: "File not found on server" });
    }

     // Update the file status to "In Progress"
     file.status = "In Progress";
     await file.save();

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error during file download:", err);
        next(err);
      }
    });
  } catch (error) {
    console.error("Error in downloadOriginalFile:", error);
    next(error);
  }
};

// Download the translated file
export const downloadTranslatedFile = async (req, res, next) => {
    const { fileId } = req.params;
  
    try {
      const file = await File.findById(fileId);
      if (!file || !file.translatedFileUrl) {
        console.error("Translated file not found in database");
        return res.status(404).json({ error: "Translated file not found" });
      }
  
      // Construct the correct file path for the translated file
      const filePath = path.resolve("uploads", path.basename(file.translatedFileUrl));
      console.log("Resolved translated file path:", filePath);
  
      // Check if the file exists on the server
      if (!fs.existsSync(filePath)) {
        console.error("Translated file not found on server");
        return res.status(404).json({ error: "Translated file not found on server" });
      }
  
      res.download(filePath, (err) => {
        if (err) {
          console.error("Error during translated file download:", err);
          next(err);
        }
      });
    } catch (error) {
      console.error("Error in downloadTranslatedFile:", error);
      next(error);
    }
  };
  



// Function to send the translated file via email
export const sendTranslatedFileByEmail = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId).populate('userId', 'email');
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const clientEmail = file.userId.email;
    const translatedFilePath = path.resolve('uploads', path.basename(file.translatedFileUrl));

    // Check if the translated file exists
    if (!fs.existsSync(translatedFilePath)) {
      return res.status(404).json({ error: 'Translated file not found on server' });
    }

    // Create the email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use other services like 'sendgrid', etc.
      auth: {
        user: 'testingusers82@gmail.com', // Admin's email
        pass: process.env.GMAIL_PASS, // Admin's email password (or use environment variables)
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Create email options
    const mailOptions = {
      from: 'testingusers82@gmail.com',
      to: clientEmail,
      subject: 'Your Translated File',
      text: 'Hello, your translated file is attached.',
      attachments: [
        {
          filename: path.basename(translatedFilePath),
          path: translatedFilePath,
        },
      ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to send email', details: error });
      }
      return res.status(200).json({ message: 'Email sent successfully', info });
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Error sending email', details: error });
  }
};
