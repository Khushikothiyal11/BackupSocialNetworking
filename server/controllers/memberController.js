const Member = require('../models/memberModel');

const getMembers = async (req, res) => {
    try {
      const members = await Member.find().select('username email profilePic');  // Make sure Member is correctly imported
      res.status(200).json(members);
    } catch (error) {
      console.error('getMembers error:', error);
      res.status(500).json({ error: 'Server error fetching members' });
    }
  };

 

const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const { id } = req.params;

    const updatedMember = await Member.findByIdAndUpdate(id, { profilePic }, { new: true });

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Profile picture updated', member: updatedMember });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Server error while updating profile picture' });
  }
};

const addFriend = async (req, res) => {
  const { id } = req.body;
  const member = await Member.findById(id);
  if (member) {
    member.friends.push('You'); // Replace 'You' with logged-in user ID
    await member.save();
    res.send('Friend added');
  }
};

const sendMessage = async (req, res) => {
  const { id, message } = req.body;
  const member = await Member.findById(id);
  if (member) {
    member.messages.push({ recipientId: id, text: message });
    await member.save();
    res.send('Message sent');
  }
};

const getProfile = async (req, res) => {
  const member = await Member.findById(req.params.id)
  .select('username email bio age profilePic');
  res.json(member);
};

module.exports = {
  getMembers,
  addFriend,
  sendMessage,
  getProfile,
};