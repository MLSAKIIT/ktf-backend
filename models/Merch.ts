import mongoose from "mongoose";

const MerchSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  merchID: String,
  imageUrl: String,
  availableSize: [],
});

export const Merch = mongoose.model("merchs", MerchSchema);
