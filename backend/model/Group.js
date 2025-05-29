import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
});

export default mongoose.model("Group", groupSchema);