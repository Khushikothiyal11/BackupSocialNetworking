const {Schema, model} = require("mongoose")
 
const conversationSchema = new Schema({
    // senderId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    // receiverId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    senderId: String,
    receiverId: String,
    message:String
    // participants: [{type: Schema.Types.ObjectId, ref: "User"}],
    // lastMessage: {
    //     text: {type: String, required: true},
    //     senderId: {type: Schema.Types.ObjectId, ref: "User"}
    // }
}, {timestamps: true})
 
module.exports = model("Conversation", conversationSchema)