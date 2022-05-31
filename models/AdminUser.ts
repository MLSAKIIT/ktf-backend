import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export const AdminUser = mongoose.model("admins", AdminUserSchema);
