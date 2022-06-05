import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  eventDate: String,
  eventID: Number,
  price: Number,
  imageUrl: String,
  userRegistered: [
    {
      uid: String,
      displayName: String,
      email: String,
      checkedIn: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export const Event = mongoose.model("events", EventSchema);
