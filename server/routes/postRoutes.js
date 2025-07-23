const express = require("express");
const router = require("express").Router()
const{createPost,getPost,getPosts,updatePost,deletePost, getUserPosts, likeDislike} = require('../controllers/postController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/posts',authMiddleware,createPost)
router.get('/posts/:id',getPost)
router.get('/posts',authMiddleware,getPosts)
router.patch('/posts/:id',authMiddleware,updatePost)
router.delete('/posts/:id',authMiddleware,deletePost)
router.put("/posts/:id/like", authMiddleware, likeDislike)

module.exports = router;