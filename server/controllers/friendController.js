const Friend = require('../models/friendModel');

exports.getFriends = async (req, res) => {
    try {
        const friends = await Friend.find();
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addFriend = async (req, res) => {
    try {
        const { name, profileImage } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const newFriend = new Friend({ name, profileImage: profileImage || 'http://localhost:5000/uploads/default.png' });
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