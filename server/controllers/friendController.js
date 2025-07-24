const Friend = require('../models/friendModel');
const { schema } = require('../models/postModel');
const mongoose = require('mongoose');
exports.getFriends = async (req, res) => {
    try {
        const friends = await Friend.find();
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getFriendsBySenderId = async (req, res) => {
    try {
        const friends = await Friend.find({ sender: req.params.senderId });
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addFriend = async (req, res) => {
    console.log('Adding friend:', req.body);
    try {
        const {senderid,receiverid,name,status } = req.body;
        console.log('Adding friend:', senderid, receiverid, name, status);
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const newFriend = new Friend(
            {
                sender:new mongoose.Types.ObjectId(senderid),
                receiver:new mongoose.Types.ObjectId(receiverid),status, name, profileImage:'http://localhost:5000/uploads/default.png' });
        console.log('New friend object:', newFriend);
        await newFriend.save();
        res.status(201).json(newFriend);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFriend = async (req, res) => {
    try {
        const deleted = await Friend.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        res.json({ message: 'Friend deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}