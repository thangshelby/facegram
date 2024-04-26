import Comment from "../config/models/commentModel.js";
import {
  getSocketIdFromUserId,
  io,
  getUserIdFromPostId,
  onlinePosts,
} from "../socket/socket.js";

export const fetchRootComment = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const response = await Comment.find({ postId, reply: false }).sort({
      updatedAt: 1,
    });
    io.to(getSocketIdFromUserId(userId)).emit("fetchRootComment", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const fetchNodeComment = async (req, res) => {
  const { postId, userId, rootComment } = req.body;
  try {
    const response = Comment.find({ postId, rootComment }).sort({
      updatedAt: 1,
    });
    io.to(getSocketIdFromUserId[userId]).emit("fetchNodeComment", response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const comment = async (req, res) => {
  const { postId, userId, comment, reply, rootComment } = req.body;
  try {
    const newComment = new Comment({
      postId,
      userId,
      comment,
      reply,
      rootComment,
    });
    await newComment.save();
    console.log(newComment)
    const response= await 
    Comment.find({postId,reply:false}).sort({
      updatedAt: 1})
 
    if (onlinePosts[postId]) {
      for (let i = 0; i < onlinePosts[postId].length; i++) {
        io.to(getSocketIdFromUserId(onlinePosts[postId][i])).emit(
          "fetchRootComment",
          response
        );
      }
    }

    res.status(200).json(newComment);
  } catch (error) {
    res.status(402).json(error);
  }
};
