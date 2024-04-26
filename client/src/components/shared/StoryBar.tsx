import { CustomAvatar } from "../ui";
import {usersProps } from "../../types";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../_root/page/Home";
import ChangePath from "./ChangePath";
import { CreateStory } from "./CreateStory";
import { useSelector } from "react-redux";
import { currentUserSelector, getAccessToken } from "../../redux/selectors";
import { getUsersHaveStory } from "../../fetchapi/story";


const StoryBar = () => {
  const accessToken = useSelector(getAccessToken);
  const currentUser = useSelector(currentUserSelector);
  const useSocketContext = useContext(SocketContext);
  const useStoryContext = useContext(StoryContext);

  const [usersHaveStory, setUsersHaveStory] = useState<usersProps[]>([]);
  const [isCreateStory, setIsCreateStory] = useState(false);

  useEffect(() => {
    getUsersHaveStory({
      accessToken,
      ownerId: currentUser._id,
      userFollowingList: currentUser.followings,
    })

    useSocketContext?.socket?.on("usersHaveStory", (users) => {  
      setUsersHaveStory(users);
    });

  }, [useSocketContext?.socket]);

  const handleCreateStory = () => {
    setIsCreateStory(false);
  };

  return (
    <div className="w-full flex flex-row gap-2 mb-[10px]">
      {useStoryContext?.showStory.userName != "" &&
        useStoryContext?.showStory.userId != "" && (
          <ChangePath
            path={`/stories/${useStoryContext?.showStory.userName}/${useStoryContext?.showStory.userId}`}
          />
        )}

      {isCreateStory && <CreateStory handler={handleCreateStory} />}

      <div
        className="relative flex flex-col gap-2 justify-center 
      items-center hover:cursor-pointer"
        onClick={() => {
          setIsCreateStory(true);
        }}
      >
        <div className="rounded-[50%]  w-[60px] h-[60px] flex items-center justify-center ">
          <CustomAvatar
            fullName={"Your story"}
            imgg={"../../public/assets/icons/profile-icon-design.jpg"}
          />
        </div>
        <p className="text-[12px] text-[#f5f5f5] ">{"Your story"}</p>
        <div className="absolute bottom-[20px] right-0 rounded-[50%] w-[20px] h-[20px] bg-blue-700 center ">
          <i className="mt-[1px] ml-[1px] fa-solid fa-plus fa-xs"></i>
        </div>
      </div>

      {/* FRIEND STORIES LIST */}
      {usersHaveStory.map((userHaveStory: usersProps) => (
        <div
          key={userHaveStory._id}
          onClick={() => {
            useStoryContext?.setShowStory({
              userName: userHaveStory.name,
              userId: userHaveStory._id,
            });
          }}
          className="flex flex-col gap-2 justify-center items-center hover:cursor-pointer"
        >
          <div className="rounded-[50%]  w-[60px] h-[60px] flex items-center justify-center bg-gradient-to-r from-[#ffb400] to-[#fd016b]">
            <CustomAvatar
              fullName={userHaveStory.userName}
              imgg={userHaveStory.imgAvatar}
            />
          </div>
          <p className="text-[12px] text-[#f5f5f5] ">{userHaveStory.userName}</p>
        </div>
      ))}
      {/* FRIEND STORIES LIST */}
    </div>
  );
};

export default StoryBar;
