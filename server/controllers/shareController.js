const ShareModel = require("../models/shareModel");
const PostModel = require("../models/postModel");
const HttpError = require("../models/errorModel");
const moment = require("moment");

// Share a post
exports.sharePost = async (req, res, next) => {
  try {
    const { postId } = req.params; // Post ID
    const userId = req.user.id; // User ID from the request body

    const post = await PostModel.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    // Check if the user has already shared the post
    const existingShare = await ShareModel.findOne({
      post: postId,
      user: userId,
    });
    if (existingShare) {
      return next(new HttpError("You have already shared this post", 400));
    }

    // Create a new share
    const newShare = new ShareModel({ post: postId, user: userId });
    await newShare.save();

    res
      .status(201)
      .json({ message: "Post shared successfully", share: newShare });
  } catch (err) {
    return next(
      new HttpError("Sharing the post failed, please try again later", 500)
    );
  }
};

// Get all shares for a post
exports.getPostShares = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // ✅ Optional: Confirm post exists
    const postExists = await PostModel.findById(postId);
    if (!postExists) {
      return next(new HttpError("Post not found", 404));
    }

    // ✅ Fetch and sort shares, enrich with user info
    const shares = await ShareModel.find({ post: postId })
      .populate("user", "fullname profilePhoto")
      .sort({ createdAt: -1 }); // Newest shares first

    // ✅ Format response for frontend
    const formattedShares = shares.map((share) => ({
      _id: share._id,
      user: share.user,
      sharedAt: moment(share.createdAt).fromNow() // e.g. "2 mins ago"
    }));

    res.status(200).json({ shares: formattedShares });
  } catch (err) {
    console.error("Error fetching shares:", err);
    return next(
      new HttpError("Fetching shares failed, please try again later", 500)
    );
  }
};
