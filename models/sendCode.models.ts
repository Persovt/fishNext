import mongoose from "mongoose";

const { Schema } = mongoose;

const sendCodeSchema = new Schema({
  id: String,
  phone: String,
  email: String,
  code: Number,
  date: Date,
  type: String,
});
export default mongoose.models.sendCodeSchema ||
  mongoose.model("sendCodeSchema", sendCodeSchema);
