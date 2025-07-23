const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  username: String,
  email: String,
  profilePic: { type: String },
  friends: [String],
  messages: [{ recipientId: String, text: String }]
});

module.exports = mongoose.model('Member', memberSchema);