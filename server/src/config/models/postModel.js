import mongoose from "mongoose";

const PostSchema= mongoose.Schema({
    userId:String,
    tags:Array,
    place:String,
    message:String,
    imageUrl:String,
    comments:Array,
    liked:Array
},{
    timestamps:true
})

const Post= mongoose.model('Post',PostSchema)

export default Post