const HttpError = require('../models/errorModel')
const mongoose = require('mongoose');
const ObjectId = new mongoose.Types.ObjectId();
const ConversationModel = require("../models/conversationModel");
const MessageModel = require("../models/messageModel"); // Assuming you have a separate Message model
 
// CREATE MESSAGE
// POST : api/messages/:receiverId
// PROTECTED
const createMessage = async (req, res, next) => {
    try {const{senderId} = req.params;
        const {receiverId,message} = req.body;
         console.log(' Request received at:', mongoose.connection.name);
 
        // check if there's already a conversation with the receiver
       // let conversation = await ConversationModel.findOne({participants: {$all: [req.user._id, receiverId]}})
        // create a new cobversation if it doesn't exist
            const conversation=new ConversationModel({
                senderId: senderId,
                receiverId: receiverId,
                message: message
            });
            // conversation = await ConversationModel.save({
            //     senderId: senderId,
            //     receiverId: receiverId,
            //     message: message
            //     // participants: [req.user._id, receiverId],
            //     // lastMessage: {text: messageBody, sender: req.user._id}
            // });
console.log(conversation)
            conversation.save()
            .then(
                   (result)=>res.send({'message':'Message sent successfully...',data:result}),
                   (err)=>res.send({'message':'Error Occured',data:err}),
                )
       
        //create a new message in the conversation
        // const newMessage = await MessageModel.create({
        //     conversationId: conversation._id,
        //     text: messageBody,
        //     senderId: req.user._id
        // });
        // await conversation.updateOne({
        //     lastMessage: {text: messageBody, senderId: req.user._id}
        // });
        // res.json(newMessage);
    } catch (error) {
        console.log(error);
        return next(new HttpError(error))
       
    }
}
 
 
// GET MESSAGE
// GET : api/messages/:receiverId
// PROTECTED
const getMessages = async (req, res, next ) => {
    try {
        const {receiverId} = req.params.receiverId;
        console.log("Receiver ID:", req.params.receiverId);
       
        // const rId =new mongoose.Types.ObjectId();// new ObjectId({ receiverId: receiverId });
        // rId.id = receiverId;
 
        // console.log("Converted Receiver ID:", rId.id);
        ConversationModel.find({receiverId:req.params.receiverId}).then(
            (result)=>res.json(result),
            (err)=>res.json('Error finding conversation:', err)
        );
        // const conversation = await ConversationModel.find({receiverId:receiverId});
        // console.log("Conversation:", conversation);
        // if (!conversation) {
        //     return next(new HttpError("You have no conversation with this person", 404))
        // }
        // // const messages = await MessageModel.find({conversationId: conversation._id}).sort
        // // ({createdAt: 1});
        //  res.json(conversation);
    } catch (error) {
        console.log(error);
        // return next(new HttpError("Failed to retrieve messages", 500));
        return next(new HttpError(error))
       
    }
}
 
const getConversations = async (req, res, next) => {
    try {
      const { senderId, receiverId } = req.params;
  
      console.log("Sender ID:", 'fullName');
      console.log("Receiver ID:", 'fullName');
  
      const messages = await ConversationModel.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      });
  
      if (!messages || messages.length === 0) {
        return res.status(200).json([]); // ✅ Just send an empty array, no error
      }
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("getConversations error:", error);
      return res.status(500).json({ message: error.message });
    }
  };
 
module.exports = {createMessage, getMessages, getConversations}