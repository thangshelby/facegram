import express from "express";
import {
  showSuggest,
  updateProfile,
  interactOtherUser,
  getUsers,
  getUser,
  getSuggestFriends,
  getAllUser
} from "../controllers/userController.js";
import { verifyAccessToken } from "../controllers/middlewareControler.js";

const userRouter = express.Router();

userRouter.get("/get-all-user",verifyAccessToken,getAllUser);
userRouter.get("/show-suggest",verifyAccessToken, showSuggest);
userRouter.put('/',verifyAccessToken,getUser)
userRouter.put("/get-users",verifyAccessToken,getUsers)
userRouter.put("/get-suggest",verifyAccessToken,getSuggestFriends)
userRouter.put("/:id", verifyAccessToken,updateProfile);
userRouter.post("/interactions",verifyAccessToken, interactOtherUser);



export default userRouter;
