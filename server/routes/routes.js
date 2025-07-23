const express = require("express");
const router = require("express").Router()

const {registerUser, loginUser, getUser, getUsers, getUserPosts, editUser, followUnfollowUser, changeUserAvatar} = require('../controllers/userControllers')
 
const { sharePost, getPostShares } = require("../controllers/shareController");



const authMiddleware = require("../middleware/authMiddleware")

//USER ROUTES
router.post('/users/register', registerUser)               //http://localhost:5000/api/users/register
router.post('/users/login', loginUser)                    // http://localhost:5000/api//users/login
router.get('/users/:id', authMiddleware, getUser)
router.get('/users', authMiddleware, getUsers)                                         
router.patch('/users/:id', authMiddleware, editUser)
router.get('/users/:id/follow-unfollow', authMiddleware, followUnfollowUser)
router.post('/users/avatar', authMiddleware, changeUserAvatar)
router.get('/users/:id/posts', authMiddleware, getUserPosts)





// Share a post
router.post("/:postId/share", sharePost);

// Get all shares for a post
router.get("/:postId/shares", getPostShares);


module.exports = router;