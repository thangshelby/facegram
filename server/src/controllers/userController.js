import { Account } from "../config/models/index.js";
import { io, getSocketIdFromUserId, onlineUsers } from "../socket/socket.js";

export const updateProfile = async (req, res) => {
  const { link } = req.body;
  var imgAvatar = link.split("\\");
  imgAvatar = "/public/assets/images/" + imgAvatar[imgAvatar.length - 1];
  const id = req.params.id;
  try {
    await Account.findOneAndUpdate(
      { _id: id },
      { imgAvatar: imgAvatar }
    );
    const ress = await Account.findById(id);
    res.status(200).json(ress);
  } catch (error) {
    res.status(401).json(error);
  }
};
export const interactOtherUser = async (req, res) => {
  const ownerId= req.body.owner
  const friendId= req.body.friend
  const type= req.body.type
  try {
    const owner = await Account.findOne({ _id: ownerId });
    const friend = await Account.findOne({ _id: friendId });
    
    if (type=='follow'){
      owner.followings.push(friendId);
      friend.followers.push(ownerId);
    }
    else if(type=='unFollow'){
      owner.followings.splice(owner.followings.indexOf(friendId), 1);
      friend.followers.splice(friend.followers.indexOf(ownerId), 1);
    }
    else if( type=='removeFollow'){
      owner.followers.splice(owner.followers.indexOf(friendId), 1);
      friend.followings.splice(friend.followings.indexOf(ownerId), 1);
    }
    
    await owner.save();
    await friend.save();

    io.to(getSocketIdFromUserId(ownerId)).emit(`getUser`, owner);
    res.status(200) .json(owner)
  } catch (error) {
    res.status(400).json(error);
  }
};

export const showSuggest = async (req, res) => {
  try {
    const response = await Account.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(405).json(error);
  }
};
export const getUsers = async (req, res) => {
  const { userId, userList,type } = req.body;
  try {
    let response;
    if(userList[0]==='all'){
      response= await Account.find()
    }
    else{
      response = await Account.find({ _id: userList });
    }
    io.to(getSocketIdFromUserId(userId)).emit(`${type}`, response);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getUser = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const response = await Account.findOne({ _id: receiverId });

    io.to(getSocketIdFromUserId(senderId)).emit("getUser", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getSuggestFriends= async(req,res)=>{
  const { userId } = req.body;
  try {
    const users= await Account.find()
    const filters= await Account.findOne({_id:userId})
    const response= users.filter((user)=>{
      return !filters.followings.includes(user._id) && user._id!=userId
    })
    io.to(getSocketIdFromUserId(userId)).emit("getSuggestFriends", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const getAllUser= async(req,res)=>{
  try {
    const response = await Account.find({})
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json(error)
  }
}