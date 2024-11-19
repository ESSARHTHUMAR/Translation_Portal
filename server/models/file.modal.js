import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    userRef: { type: String, required: true },
    filename: { type: String, required: true },
    fromLanguage: { type: String, required: true },
    toLanguage: { type: String, required: true },
    tat: { type: String, required: true },
    status: { type: String, default: "Uploaded" },
    translatedFilename: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
