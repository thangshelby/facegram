import { CustomAvatar } from "../../components/ui";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { currentUserSelector, getAccessToken } from "../../redux/selectors";

import { SocketContext } from "../../context/SocketContext";
import { ShowFriendsProps, usersProps } from "../../types";
import {
  getUser,
  getSuggestFriends,
} from "../../fetchapi/userHandler";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { getUsers } from "../../fetchapi/userHandler";
import { SocialMediaInteraction } from "../userSlice";
import store  from "../../redux/store";



const ShowFriends = React.memo(
  ({ type, searchFilter, admin, setIsShow }: ShowFriendsProps) => {
    const accessToken = useSelector(getAccessToken);
    const [friends, setFriends] = useState<usersProps[]>([]);
    const useSocketContext = useContext(SocketContext);
    const currentUser: usersProps = useSelector(currentUserSelector);

    useEffect(() => {
      if (type == "Suggest") {
        getSuggestFriends({ accessToken, userId: currentUser._id });
        useSocketContext?.socket?.on("getSuggestFriends", (userList) => {
          setFriends(userList);
        });
      } else {
        useSocketContext?.socket?.on("getUsers", (userList) => {
          setFriends(userList);
        });
      }
    }, [useSocketContext?.socket, admin, type, accessToken, currentUser]);

    // FUNCTION HANDLER
    const handleChangeProfile = (friend: usersProps) => {
      getUser({
        accessToken,
        senderId: currentUser._id,
        receiverId: friend._id,
      });
      setIsShow && setIsShow({ check: false, type: "" });
    };

    const handleSocialMediaInteraction = (owner:string,friend:string,type:'removeFollow'|'unFollow'|'follow') => {
      store.dispatch(SocialMediaInteraction({accessToken,owner,friend,type}))
    };

    return (
      <div className="ml-[10px] flex flex-col flex-1 max-w">
        {type == "Suggest" && (
          <div className="py-[20px] px-[24px] w-[30%]">
            {friends.length > 0 && "Suggests"}
          </div>
        )}

        <div className="  flex gap-3 flex-col max-w overflow-y-hidden">
          {friends?.map(
            (friend: usersProps) =>
              friend.userName.includes(searchFilter) && (
                <div
                  className="flex flex-row items-center max-w gap-3"  
                  key={friend._id}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeProfile(friend);
                    }}
                    className="hover-pointer"
                  >
                    <CustomAvatar
                      fullName={friend.userName}
                      imgg={friend.imgAvatar}
                      size={
                        "w-[36px] h-[36px] rounded-[50%] flex justify-center items-center"
                      }
                    />
                  </div>

                  <div
                    className="flex justify-between items-center
          text-[14px] font-medium flex-1 mr-[30px]"
                  >
                    <div className="flex flex-col text-[#f5f5f5]">
                      <p>{friend.userName}</p>
                      <p>{friend.name}</p>
                    </div>

                    {type == "Suggest" ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSocialMediaInteraction(currentUser._id,friend._id,'follow')
                          getUsers({accessToken,userId:currentUser._id,type:'getUsers',userList:[...currentUser.followings,friend._id]})
                        }}
                        className=" font-semibold text-[#3baef8] relative hover-pointer"
                      >
                        Theo dõi
                      </div>
                    ) : (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (type == "Followers") {
                            handleSocialMediaInteraction(currentUser._id,friend._id,'removeFollow')
                            getUsers({accessToken,userId:currentUser._id,type:'getUsers',userList:currentUser.followers.filter((str)=>str!=friend._id)})
                          } else {
                            handleSocialMediaInteraction(currentUser._id,friend._id,'unFollow')
                            getUsers({accessToken,userId:currentUser._id,type:'getUsers',userList:currentUser.followings.filter((str)=>{
                            
                              return str!=friend._id
                            })})
                          }
                        }}
                        className="font-semibold text-[#fff] relative
                bg-[#363636]
                hover-pointer px-[16px] py-[6px] rounded-[8px] hover:opacity-60"
                      >
                        {type == "Followers" ? "Remove" : "UnFollow"}
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    );
  }
);

export default ShowFriends;
