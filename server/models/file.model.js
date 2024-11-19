import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalFilename: {
      type: String,
      required: true,
      unique: true
    },
    fromLanguage: {
      type: String,
      required: true,
    },
    toLanguage: {
      type: String,
      required: true,
    },
    turnaroundTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Uploaded", "In Progress", "Completed"],
      default: "Uploaded",
    },
    originalFileUrl: {
      type: String,
      required: true,
    },
    translatedFileUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
export default File;
