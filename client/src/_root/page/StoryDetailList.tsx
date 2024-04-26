import { storyProps, usersProps } from "../../types";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../_root/page/Home";
import { useSelector } from "react-redux";
import { currentUserSelector, getAccessToken } from "../../redux/selectors";
import { getUsersHaveStory, getUsersStories } from "../../fetchapi/story";
import { ChangePath } from "../../components/shared";
import { StoryDetail } from ".";
import { useParams } from "react-router-dom";
import { CustomAvatar } from "../../components/ui";

const StoryDetailList = () => {
  const accessToken = useSelector(getAccessToken);
  const currentUser = useSelector(currentUserSelector);
  const useSocketContext = useContext(SocketContext);
  const useStoryContext = useContext(StoryContext);
  const currentOwnerId = useParams().userId;

  const [usersHaveStory, setUsersHaveStory] = useState<usersProps[]>([]);
  const [userMapStories, setUSerMapStories] = useState<{
    [key: string]: storyProps[];
  }>({});
  const [currentOwnerStory, setCurrentOwnerStory] =
    useState<usersProps>(currentUser);
  const indexOfcurrentUser =
    usersHaveStory && currentOwnerStory
      ? usersHaveStory.indexOf(currentOwnerStory)
      : 0;


  // GETUSERSHAVESTORY
  useEffect(() => {
    getUsersHaveStory({
      accessToken,
      ownerId: currentUser._id,
      userFollowingList: currentUser.followings,
    });

    getUsersStories({
      accessToken,
      ownerId: currentUser._id,
      userFollowingList: currentUser.followings,
    });
    useSocketContext?.socket?.on("usersHaveStory", (users) => {
      users.forEach((user) => {
        if (user._id == currentOwnerId) {
          setCurrentOwnerStory(user);
        }
      });
      setUsersHaveStory(users);
    });
    useSocketContext?.socket?.on("usersStories", (usersStories) => {
      setUSerMapStories(usersStories);
    });
  }, [useSocketContext?.socket]);

  useEffect(()=>{
    usersHaveStory.forEach((user) => {
      if (user._id == currentOwnerId) {
        setCurrentOwnerStory(user);
      }
    });
  },[currentOwnerId])

  // FUNCTION HANDLER
  const handleCloseStory = () => {
    useStoryContext?.setShowStory({ userName: "", userId: "" });
  };
  return (
    <div
      className="absolute top-0 left-0  w-full 
    h-screen bg-[#1a1a1a] center z-30 "
    >
      {/*CHANGE PAGE */}
      {useStoryContext?.showStory.userName == "" &&
        useStoryContext?.showStory.userId == "" && <ChangePath path="/" />}

      {/* Navigate Icon */}

      {/* --LOGO-- */}
      <div
        className="absolute top-3 left-3 
        w-[171px] h-[36px] hover-pointer z-30"
        onClick={handleCloseStory}
      >
        <img
          onClick={handleCloseStory}
          src="../../public/assets/images/logo.svg"
        />
      </div>
      {/* --LOGO-- */}

      {/* CLOSE BUTTON */}
      <div
        className="absolute w-[13px] h-[13px] 
      top-[10px] right-[10px] hover-pointer"
        onClick={handleCloseStory}
      >
        <i className="fa-solid fa-x"></i>
      </div>
      {/* CLOSE BUTTON */}

      {/* Navigate Icon */}

      {/* STORYLISTDETAIL */}
      {currentOwnerStory && userMapStories && (
        <div
          className="flex flex-row items-center gap-x-[30px] w-[880px] 
      h-[846px]  overflow-hidden"
        >
          {usersHaveStory.indexOf(currentOwnerStory) <= 1 &&
            usersHaveStory
              .slice(0, 2 - usersHaveStory.indexOf(currentOwnerStory))
              .map((user) => {
                return (
                  <div
                    className="flex-start min-w-[120px] h-[215px]"
                    key={user._id}
                  />
                );
              })}

          {usersHaveStory.slice(indexOfcurrentUser>1?indexOfcurrentUser-2:0,
          indexOfcurrentUser>indexOfcurrentUser-1?indexOfcurrentUser+3:usersHaveStory.length)?.map((user) => {
            
            return (
              <div
                className={`relative flex flex-start hover-pointer `}
                onClick={(e) => {
                  e.stopPropagation()
              
                  useStoryContext?.setShowStory({
                    userName: user.name,
                    userId: user._id,
                  });
                  setCurrentOwnerStory(user);
                }}
                key={user._id}
              >
                <StoryDetail
                  ownerStory={user}
                  active={currentOwnerId == user._id ? true : false}
                  stories={userMapStories[user._id]}
                  usersHaveStory={usersHaveStory}
                  indexOfcurrentUser={indexOfcurrentUser}
                />

                {currentOwnerId != user._id && (
                  <div className="absolute w-[120px] h-[215px] flex flex-col justify-center items-center gap-y-3">
                    <CustomAvatar
                      fullName={user.userName}
                      imgg={user.imgAvatar}
                      size="w-[56px] h-[56px]"
                    />
                    <div className="tex-white text-[14px] font-semibold ">
                      {user.userName}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* STORYLISTDETAIL */}
    </div>
  );
};

export default StoryDetailList;
