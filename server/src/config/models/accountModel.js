import mongoose from "mongoose";

const AccountSchema= mongoose.Schema({
    name:String,
    userName:String,
    email:String ,      
    password:String,
    posts:Array,
    imgAvatar:String,
    followers:[String],
    followings:[String],
},{
    timestamps:true
})

const Account= mongoose.model('Account',AccountSchema)

export default Account