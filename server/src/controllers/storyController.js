import { Story, Account } from "../config/models/index.js";
import { io, getSocketIdFromUserId, onlineUsers } from "../socket/socket.js";

export const getStories = async (req, res) => {
  const { ownerStoryId,receiverId } = req.body;
  try {
    const response = await Story.find({ userId: ownerStoryId })
    io.to(getSocketIdFromUserId(receiverId)).emit("stories", response);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const createStory = async (req, res) => {
  const { type, userId, source, sound, content } = req.body;
  try {
    const newStory = await new Story({
      type,
      source,
      userId,
      content,
      sound,
    });
    await newStory.save();
    const userList = [userId];

    const onlineUserIDs = Object.keys(onlineUsers);


    for (let i = 0; i < onlineUserIDs.length; i++) {
      const user = await Account.findOne({ _id: onlineUserIDs[i] });
      if (user.followings.includes(userId)) {
        userList.push(onlineUserIDs[i]);
      }
    }

    for (let i = 0; i < userList.length; i++) {
    
      io.to(getSocketIdFromUserId(userList[i])).emit("newStory", newStory);
    }
    return res.status(200).json(newStory);
  } catch (error) {
    res.status(402).json(error);
  }
};

export const deleteStory = async (req, res) => {
  const { storyId } = req.body;
  try {
    await Story.findOneAndDelete({ _id: storyId });
    return res.status(200).json("Story deleted");
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getUsersHaveStory = async (req, res) => {
  const { ownerId, userFollowingList } = req.body;
  
  try {
    const response = [];
    for (let i = 0; i < userFollowingList.length; i++) {
      const currentUserId = userFollowingList[i];

      const stories = await Story.find({ userId: currentUserId });

      if (stories.length > 0) {
        const currentUser= await Account.findOne({_id:currentUserId})
        response.push(currentUser);
      }
    }
    io.to(getSocketIdFromUserId(ownerId)).emit("usersHaveStory", response);
  
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getUsersStories=async(req,res)=>{
  const { ownerId, userFollowingList } = req.body;
  try {
    const response = {};
    for (let i = 0; i < userFollowingList.length; i++) {
      const currentUserId = userFollowingList[i];
      const stories = await Story.find({ userId: currentUserId });
      if(stories.length>0){
        response[currentUserId]= stories
      }
    }
    console.log(response)
    io.to(getSocketIdFromUserId(ownerId)).emit("usersStories", response);
  
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json(error);
  }
}