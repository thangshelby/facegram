
import { Post, Account } from "../config/models/index.js";

export const getHomeFeed = async (req, res) => {
  const {userId }= req.params
  try {
    const user = await Account.findOne({ _id: userId })
    const response = await Post.find({'userId':[userId,...user.followings]}).sort({message:-1})
    res.status(200).json(response);
    
  } catch (error) {
    return res.status(401).json("Error Found !");
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.params.userId;
  try {
    const posts = await Post.find({ userId });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json("Error Found !");
  }
};
export const getPost = async (req, res) => {
  const postId= req.params.postId;
  try {
    const post = await Post.findOne({ _id:postId });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json("Error Found !");
  }
};



export const createPost = async (req, res) => {
  const { userId, tags, place, message, imageUrl } = req.body;
  const newPost = new Post({
    userId,
    tags,
    place,  
    message,
    imageUrl,
    comments: [],
    liked: [],
  });
  try {
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(401).json("Error Found !");
  }
};
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.deleteOne({ _id: postId });
    return res.status(200).json("Success");
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const likePost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const post = await Post.findOne({ _id: postId });
    post.liked.push(userId);
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const unLikePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId });
    post.liked.splice(post.liked.indexOf(userId), 1);
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json(error);
  }
};



