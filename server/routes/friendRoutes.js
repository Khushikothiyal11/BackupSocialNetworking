const express = require('express');
const router = express.Router();
const { getFriends, addFriend, deleteFriend,getFriendsBySenderId } = require('../controllers/friendController');

router.get('/', getFriends); // Get all friends
router.get('/:senderId', getFriendsBySenderId); // Get friends by sender ID
router.post('/add', addFriend); // Add a new friend 
router.delete('/:id', deleteFriend); // Delete a friend by ID
module.exports = router;