import mongoose from "mongoose";

const { Schema } = mongoose;

const RefreshModel = new Schema({
  userId: String,
  refreshToken: String,
  fingerprint: String,
  expiresIn: String,
  createdAt: String,
  status: String,
});
export default mongoose.models.RefreshModel ||
  mongoose.model("RefreshModel", RefreshModel);
