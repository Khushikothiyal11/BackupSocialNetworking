const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    name: { type: String, required: true },
        profileImage: { type: String,
        default: "http://localhost:5000/uploads/default.png",
        }
    },{
timestamps: true});

    module.exports = mongoose.model('Friend', friendSchema);