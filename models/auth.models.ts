import mongoose from "mongoose";

const { Schema } = mongoose;

const authSchema = new Schema({
  id: String,
  phone: String,
  email: String,
  visitorId: String,
  date: Date,

});
export default mongoose.models.authSchema ||
  mongoose.model("authSchema", authSchema);
