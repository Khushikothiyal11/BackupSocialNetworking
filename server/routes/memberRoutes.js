const express = require('express');
const {
  getMembers,
  addFriend,
  sendMessage,
  getProfile,
} = require('../controllers/memberController');

const router = express.Router();

router.get('/members', getMembers);
router.post('/add-friend', addFriend);
router.post('/send-message', sendMessage);
router.get('/profile/:id', getProfile);

module.exports = router;