import mongoose from "mongoose";

const ConversationSchema= mongoose.Schema({
    participants:Array,
    messages:Array
})

export const Conversation= mongoose.model('conversation',ConversationSchema)


const MessageSchema= mongoose.Schema({
    senderId:String,
    receiverId:String,
    message:String
})

export const Message= mongoose.model('message',MessageSchema)

