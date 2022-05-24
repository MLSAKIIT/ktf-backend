import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a Username"],
    }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
