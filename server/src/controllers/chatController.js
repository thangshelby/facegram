import { Message, Conversation } from "../config/models/index.js";
import { io, getSocketIdFromUserId } from "../socket/socket.js";

export const findConversation = async (req, res, next) => {
  const { senderId, receiverId } = req.body;
  try {
    const participants = sortParticipants([senderId, receiverId]);

    const conversation = await Conversation.findOne({ participants });
    if (!conversation) {
      const newConversation = await new Conversation({
        participants,
        messages: [],
      });
      await newConversation.save();
      res.conversation = newConversation;
    }
    res.conversation = conversation;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const sendMessage = async (req, res, next) => {
  const { senderId, receiverId, message } = req.body;
  const conversation = res.conversation;

  try {
    const newMessage = await new Message({ senderId, receiverId, message });
    await newMessage.save();
    conversation.messages.push(String(newMessage._id));
    await conversation.save();
    res.conversation = conversation;

    const receiver = getSocketIdFromUserId(receiverId);
    const sender = getSocketIdFromUserId(senderId);
    console.log(newMessage)
    io.to(receiver).emit("sendMessage", newMessage);
    io.to(sender).emit("sendMessage", newMessage);
    res.status(200).json(newMessage)
  } catch (error) {
    res.status(401).json(error);
  }
};
export const findMessagesOfConversation = async (req, res) => {
  const conversation = res.conversation;
  const { senderId } = req.body;
  try {
    const response = await Message.find({ _id: conversation.messages });
    const receiver = getSocketIdFromUserId(senderId);
    if (receiver) {
      io.to(receiver).emit("getConversation", response);
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(402).json(error);
  }
};

const sortParticipants = (participants) => {
  return participants.sort();
};
