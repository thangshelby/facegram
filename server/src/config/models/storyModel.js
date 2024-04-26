import mongoose from "mongoose";

const StorySchema = mongoose.Schema(
  {
    type: String,
    source: String,
    userId: String,
    content:String,
    sound:String
  },
  { timeStamps: true }
);

const Story = mongoose.model("storys", StorySchema);

export default Story;
