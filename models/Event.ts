import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  eventDate: String,
  eventID: Number,
  price: Number,
  imageUrl: String,
});

export const Event = mongoose.model("events", EventSchema);
