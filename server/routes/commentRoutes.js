const express = require("express");
const router = require("express").Router()
const { createComment, getPostComments, deleteComment } = require("../controllers/commentController")

const authMiddleware = require("../middleware/authMiddleware")

router.post('/comments/:postId',authMiddleware, createComment)
router.get('/comments/:postId',authMiddleware, getPostComments)
router.delete('/comments/:commentId',authMiddleware, deleteComment)

module.exports = router;