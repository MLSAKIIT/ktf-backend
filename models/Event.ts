import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
    name: String,
    description: String,
    eventDate: String,
    price: Number,
    imageUrl: String
});

export const Event = mongoose.model("events", EventsSchema);
