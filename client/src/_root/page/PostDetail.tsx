import { useContext, useEffect, useState } from "react";
import { HomeContext } from "./Home";
import { ChangePath } from "../../components/shared";
import { CustomAvatar } from "../../components/ui";
import { usersProps, postProps } from "../../types";
import { useSelector } from "react-redux";
import { unActiveOnlinePost } from "../../fetchapi/commentHandler";
import {
  currentUserSelector,
  getAccessToken,
  getCurrentPostSelector,
} from "../../redux/selectors";
import { comment } from "../../fetchapi/commentHandler";
import { likePost, unLikePost } from "../postSlice";
import store from "../../redux/store";
import { calculateTime } from "../../constants";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { SocketContext } from "../../context/SocketContext";

const PostDetail = () => {
  const params = useParams();
  const index = Number(params.id?.slice(0, 1));
  const accessToken = useSelector(getAccessToken);
  const currentUser: usersProps = useSelector(currentUserSelector);
  const currentPost: postProps = useSelector(getCurrentPostSelector);
  const commentTypeInit = {
    accessToken,
    postId: currentPost._id,
    userId: currentUser._id,
    comment: "",
    reply: false,
    rootComment: "",
  };
  const [commentType, setCommentType] = useState<{
    accessToken: string;
    postId: string;
    userId: string;
    comment: string;
    reply: boolean;
    rootComment: string;
  }>(commentTypeInit);
  const [postOwner, setPostOwner] = useState<usersProps>(currentUser);
  const useHomeContext = useContext(HomeContext);
  const useSocketConext = useContext(SocketContext);

  useEffect(() => {
    useSocketConext?.socket?.on("getUser", (user) => {
      setPostOwner(user);
    });
  }, [useSocketConext?.socket]);
  // FUNCTION HANDLER
  const handleLikePost = () => {
    const data = {
      accessToken,
      userId: currentUser._id,
      postId: currentPost._id,
      index,
    };
    if (currentPost.liked.includes(currentUser._id)    ) {
      store.dispatch(unLikePost(data));
    } else {
      store.dispatch(likePost(data));
    }
  };

  const handleUnMountPost = () => {
    unActiveOnlinePost({
      accessToken,
      userId: currentUser._id,
      postId: currentPost._id,
    });
    useHomeContext?.setShowPostDetail("");
  };

  const handleSetComment = (data: string) => {
    setCommentType({
      ...commentType,
      rootComment: data.slice(data.indexOf(" ") + 1, data.length),
      comment: data.slice(0, data.indexOf(" ")),
    });
  };
  const handleSendComment = () => {
    comment(commentType);
    setCommentType(commentTypeInit);
  };
  return (
    <div
      onClick={() => {
        handleUnMountPost();
      }}
      className="absolute top-0 left-0 
    z-20 flex justify-center items-center
    w-full h-screen "
    >
      {/* CLOSE BUTTON */}
      <div
        onClick={() => {
          handleUnMountPost();
        }}
        className="absolute w-[13px] h-[13px ] top-[10px] right-[10px]"
      >
        <i className="fa-solid fa-x"></i>
      </div>
      {/* CLOSE BUTTON */}

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex 
      flex-row max-h-[460px] bg-dark-1"
      >
        <div className="w- lg:w-[460px]">
          <img className="object-contain w-full h-full" src={currentPost.imageUrl} />
        </div>

        <div className="w-[410px] px-[16px] py-[14px] ">
          <div className="flex row gap-2 items-center justify-center">
            <CustomAvatar
              size=" w-[32px] h-[32px]"
              fullName={postOwner.userName}
              imgg={postOwner.imgAvatar}
            />
            <div className="w-full flex flex-col">
              <p className="leading-5 text-[18px]  text-white">
                {postOwner.userName}
              </p>
              <p className="text-[16px] font-thin text-white">
                {postOwner.name.slice(0, postOwner.name.indexOf(" "))}
              </p>
            </div>
          </div>

          <Comment
            postOwner={postOwner}
            currentPost={currentPost}
            handleSetComment={handleSetComment}
          />

          <div className=" flex flex-col gap-1 py-[8px] justify-evenly border-t-[1px] border-[#363636]">
            <div className="flex gap-2 items-center icon-size ">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikePost();
                }}
              >
                <img
                  src={
                    currentPost.liked.includes(currentUser._id)
                      ? "../public/assets/icons/liked.svg"
                      : "../public/assets/icons/like.svg"
                  }
                />
              </div>
              <div>
                <img src={"../public/assets/icons/chat.svg"} />
              </div>
              <div>
                <img src={"../public/assets/icons/share.svg"} />
              </div>
            </div>

            <div className="flex gap-2 flex-row text-[13.5px] text-white">
              <p>{calculateTime(currentPost.createdAt) || "Just now"}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 border-t-[1px] py-[8px] border-[#363636]">
            <img
              className="w-[24px] h-[24px]"
              src="../public/assets/icons/wallpaper.svg"
            />

            <div className="relative w-full">
              <input
                type="text"
                className=" py-[2px]  px-[5px] b bg-dark-1 text-[#fff] w-full 
            placehoder:opacity-[50] placehoder:text-14px outline-none "
                value={commentType.comment}
                placeholder="Add a comment"
                onChange={(e) => {
                  setCommentType({
                    ...commentType,
                    postId: currentPost._id,
                    comment: e.target.value,
                  });
                }}
              />
              <p
                onClick={() => {
                  handleSendComment();
                }}
                className={`${
                  commentType.comment != ""
                    ? "text-[#0095f6] hover:text-white hover-pointer "
                    : "opacity-50"
                } absolute text-[14px] top-0 right-0 font-semibold`}
              >
                Post
              </p>
            </div>
          </div>
        </div>
      </div>

      {!useHomeContext?.showPostDetail && <ChangePath path="/" />}
    </div>
  );
};

export default PostDetail;
