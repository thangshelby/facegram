import jwt from "jsonwebtoken";
import { onlinePosts } from "../socket/socket.js";
export const verifyAccessToken = async (req, res, next) => {
  const AccessToken = req.headers.accesstoken;
  const token = AccessToken;
  if (token) {
    jwt.verify(AccessToken, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json('Token is not valid')
      }
      next();
    });
  }
  else{
    res.status(401).json('You are not authenticated')
  }
};

export const activeOnlinePost=async(req,res,next)=>{
  const postId= req.params.postId;
  const userId= req.headers.userid
  if (postId in onlinePosts){
    onlinePosts[postId].push(userId)
  }
  else{
    onlinePosts[postId]= [userId]
  }
  console.log(onlinePosts)
  next()
}


export const unActiveOnlinePost=async(req,res)=>{
  const {postId,userId}= req.body
  try {
    
    onlinePosts[postId].splice([onlinePosts[postId].indexOf(userId)],1)
    res.status(200).json('Success')
  } catch (error) {
    res.status(400).json(error)
  }
}