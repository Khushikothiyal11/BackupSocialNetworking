const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Optional: Enforce one share per user per post
shareSchema.index({ post: 1, user: 1 }, { unique: true });

 