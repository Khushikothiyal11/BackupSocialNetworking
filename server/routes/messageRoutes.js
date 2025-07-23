const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  getConversations
} = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

// GET all conversations for the authenticated user
router.get('/conversations/:senderId/:receiverId', getConversations);

// CREATE a message between two users (receiverId should be in params)
router.post('/messages/:senderId', createMessage);

// GET all messages in a conversation with a receiver
router.get('/messages/:receiverId', getMessages);

module.exports = router;