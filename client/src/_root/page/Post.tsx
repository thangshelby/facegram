import  { useState } from "react";
import { CustomAvatar } from "../../components/ui";
import { useSelector } from "react-redux";
import { likePost, unLikePost ,getCurrentPost} from "../postSlice";
import { currentUserSelector,getAccessToken } from "../../redux/selectors";
import { usersProps, postProps } from "../../types";
import store from "../../redux/store";
import { ChangePath } from "../../components/shared";
import { useContext } from "react";
import {HomeContext,HomeContextProps } from "./Home";
import { calculateTime } from "../../constants";
import { getUser } from "../../fetchapi/userHandler";

const Post = ({
  post,
  index,
  account,
}: {
  post: postProps;
  index: number;
  account: usersProps;
}) => {
  const currentUser: usersProps = useSelector(currentUserSelector);
  const accessToken= useSelector(getAccessToken)

  const { _id, tags, place, message, imageUrl, liked,createdAt } = post;
  const [isLiked, setIsLiked] = useState<boolean>(liked.includes(currentUser._id));
  const [isSaved, setIsSaved] = useState(false);

  const Home: HomeContextProps|null= useContext(HomeContext)
 
  // FUNCTION HANDLER


  const handleLikePost = () => {
    const data = {
      accessToken,
      userId: currentUser._id,
      postId: _id,
      index,
    };

    if (!isLiked) {
      store.dispatch(likePost(data));
    } else {
      store.dispatch(unLikePost(data));
    }
    setIsLiked(!isLiked);
  };

  const handleShowPostDetail =  () => {
    store.dispatch(getCurrentPost({accessToken,postId:_id,userId:currentUser._id}))
    Home?.setShowPostDetail(post._id);
    getUser({accessToken,senderId:currentUser._id,receiverId:account._id})
  };
  
  return (
   
    <div className="p-[28px] flex flex-col bg-dark-1 ">
      
      { Home?.showPostDetail==post._id&& <ChangePath path={`post-detail/${index}${post._id}`} />}
      
      <div className="flex row gap-3">
        <CustomAvatar fullName={account.userName} imgg={account.imgAvatar} />
        <div className="w-full flex flex-col">
          <p className="text-[18px] font-semibold text-white">
            {account.userName}
          </p>
          <div className="flex gap-2 flex-row text-[13.5px] text-light-3 ">
            <p>{calculateTime(createdAt) || "Just now"}</p>•<p>{place}</p>
          </div>
        </div>
      </div>

      <div className="py-[10px] ">
        <p className="text-white text-[18px]">{message}</p>
        <div>
          {tags.map((tag: string) => (
            <p key={tag} className="text-[16px] text-light-3">
              #{tag}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full  h-[360px] 
      rounded-[20px] overflow-hidden">
        <img
          onDoubleClick={() => {
            handleLikePost();
          }}
          className="object-cover w-full h-full  
          rounded-[50px] overflow-hidden"
          src={imageUrl}
        />
      </div>

      <div className="mt-[10px] flex w-full justify-between">
        
        <div className="flex gap-2 items-center icon-size">
          <div onClick={() => handleLikePost()}>
            <img
              src={
                liked.includes(currentUser._id)
                  ? "../public/assets/icons/liked.svg"
                  : "../public/assets/icons/like.svg"
              }
            />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              handleShowPostDetail();
            }}
          >
            <img src={"./public/assets/icons/chat.svg"} />
          </div>

          <div>
            <img src={"./public/assets/icons/share.svg"} />
          </div>

        </div>

        <div className="hover-pointer" onClick={() => setIsSaved(!isSaved)}>
          <img
            src={
              isSaved
                ? "./public/assets/icons/saved.svg"
                : "./public/assets/icons/save.svg"
            }
          />
        </div>
      </div>

      <p className="mt- text-[18px] text-white ">{liked.length} likes</p>
    </div>  
  );
};

export default Post;
