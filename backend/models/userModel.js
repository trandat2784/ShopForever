import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true, default: 0 },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
