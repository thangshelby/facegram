import mongoose from "mongoose";

const CommentSchema= mongoose.Schema({
    postId:String,
    userId:String,
    comment:String,
    reply:Boolean,
    rootComment:String
},{
    timeStamps:true
})

const Comment= mongoose.model('Comment',CommentSchema)

export default Comment