import express from "express";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { required: true, type: String },
  items: { required: true, type: Array },
  amount: { type: Number, require: true },
  address: { required: true, type: Object },
  status: { required: true, type: String, default: "Order Placed" },
  paymentMethod: { require:true, type: String },
  payment: { type: Boolean, require: true, default: false },
  date: { type: Number, require: true },
});
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
