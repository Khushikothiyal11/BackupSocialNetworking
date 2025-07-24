const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const friendSchema = new mongoose.Schema({
    sender:{type:Schema.Types.ObjectId,ref:"User"}, 
    receiver:{type:Schema.Types.ObjectId,ref:"User"},
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'accepted' },
    name: { type: String, required: true },
    profileImage: { type: String,
        default: "http://localhost:5000/uploads/default.png",
        }
    },
    {
timestamps: true});

    module.exports = mongoose.model('Friend', friendSchema);