const CommentModel = require("../models/commentModel");
const PostModel = require("../models/postModel");
const HttpError = require("../models/errorModel");
const UserModel = require("../models/userModel");
const moment = require("moment");


//create comment
// POST : api/comments/:postId
const createComment = async (req, res, next) => {
  try {
     const { postId } = req.params;
    const { comment } = req.body;
    if (!comment) {
      return next(new HttpError("Please write a comment", 422));
    }
    //get comment creator from db
    const commentCreator = await UserModel.findById(req.user.id);
    const newComment = await CommentModel.create({
      creator: {
        creatorId: req.user.id,
        creatorName: commentCreator?.fullName,
        creatorPhoto: commentCreator?.profilePhoto,
      },
      postId,
      comment,
    });
    await PostModel.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment?._id } },
      { new: true }
    );
    res.json(newComment);
  } catch (error) {
    return next(new HttpError(error.message,500));
  }
};

//GET comment
// GET : api/comments/:postId

const getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Verify post exists
    const postExists = await PostModel.findById(postId);
    if (!postExists) {
      return next(new HttpError("Post not found", 404));
    }

    // Find and sort comments
    const rawComments = await CommentModel.find({ postId }).sort({ createdAt: -1 });

    // Format timestamps into "2 mins ago" style
    const comments = rawComments.map(comment => ({
      _id: comment._id,
      comment: comment.comment,
      creator: comment.creator,
      createdAt: moment(comment.createdAt).fromNow(),
      updatedAt: moment(comment.updatedAt).fromNow()
    }));

    res.status(200).json(comments);
  } catch (error) {
    console.log("Error while fetching comments:", error);
    return next(new HttpError(error.message || "Failed to retrieve comments", 500));
  }
};

//Delete comment
//DELETE : api/comments/:postId
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return next(new HttpError("Comment not found", 404));
    }

    const commentCreator = await UserModel.findById(comment.creator.creatorId);
    if (!commentCreator) {
      return next(new HttpError("Comment owner not found", 404));
    }

    // Check if the logged-in user is the comment creator
    if (commentCreator._id.toString() !== req.user.id) {
      return next(new HttpError("You are not authorized to delete this comment", 403));
    }

    // Remove comment from the post’s comment array
    await PostModel.findByIdAndUpdate(comment.postId, {
      $pull: { comments: commentId },
    });

    const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error while deleting comment:", error);
    return next(new HttpError(error.message || "Failed to delete comment", 500));
  }
};
module.exports = { createComment, getPostComments, deleteComment };
