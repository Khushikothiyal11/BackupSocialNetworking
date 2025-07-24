const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePhoto: {
      type: String,
      default: "http://localhost:5000/uploads/USER ID.webp",
    },
    bio: { type: String, default: "No bio yet" },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);
module.exports = model("User", userSchema);
