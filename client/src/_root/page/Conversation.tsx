import { CustomAvatar } from "../../components/ui";
import { usersProps } from "../../types";
import { useSelector } from "react-redux";
import { currentUserSelector, getAccessToken } from "../../redux/selectors";
import { SocketContext } from "../../context/SocketContext";
import { Message } from ".";
import { useState, useContext, useEffect } from "react";
import { getConversation } from "../../fetchapi/messageHandler";
import { getUsers } from "../../fetchapi/userHandler";
const MessageLayout = () => {
  const useSocketConext = useContext(SocketContext);
  const accessToken = useSelector(getAccessToken);
  const currentUser: usersProps = useSelector(currentUserSelector);
  const [onChating, setOnChating] = useState<usersProps>(currentUser);
  const time = { 0: "m", 1: "h" };
  const [friendList, setFriendList] = useState<usersProps[]>([]);

  useEffect(() => {
    getUsers({
      accessToken,
      userId: currentUser._id,
      userList: currentUser.followings,
      type: "getUsers",
    });
    useSocketConext?.socket?.on("getUsers", (userList) => {
      setFriendList(userList);
    });
  }, [useSocketConext, accessToken, currentUser]);

  const handleGetConversation = (receiver: usersProps) => {
    getConversation({
      accessToken,
      senderId: currentUser._id,
      receiverId: receiver._id,
    });
    setOnChating(receiver);
  };

  return (
    <div className="w-full flex flex-row text-[#f5f5f5] h-screen ">
      <div className="flex flex-col">
        <div className="px-[24px]">
          <div className="text-[16px] flex font-bold flex-row justify-between pt-[36px] pb-[12px] items-center">
            <div className="hidden md:flex ">{currentUser.userName}</div>
            <div className="flex flex-row">
              <i className="mx-[10px] fa-solid fa-caret-down hidden md:block"></i>
              <i className="w-[40px] block h-[40px] p-[8px] fa-regular fa-pen-to-square"></i>
            </div>
          </div>
          <div className="hidden md:flex pt-[16px] pb-[12px]  items-center flex-row justify-between">
            <div className="font-bold text-[16px]">Messages</div>
            <p className="text-[#a8a8a8] font-semibold    text-[14px]">
              Requests
            </p>
          </div>
        </div>

        <div className="flex flex-col overflow-y-scroll">
          {friendList.map((friend) => (
            <div
              key={friend._id}
              className={`px-[24px] py-[8px] flex flex-row gap-2 hover:bg-[#1e1d1d] hover:cursor-pointer
              ${onChating._id === friend._id && "bg-[#262626]"}
              `}
              onClick={() => {
                handleGetConversation(friend);
              }}
            >
              <div className="relative">
                <CustomAvatar
                  fullName={friend.userName}
                  imgg={friend.imgAvatar}
                  size={"w-[56px] h-[56px]"}
                />
                {useSocketConext?.currentUsersOnline.includes(friend._id) && (
                  <div className="flex flex-row gap-1 items-center absolute left-0 bottom-0">
                    <div
                      className="rounded-[50%] absolute bg-green-600 w-[10px] left-10 bottom-1 
                    border-solid border-black border-[1px]  h-[10px]"
                    />
                  </div>
                )}
              </div>

              <div className="md:flex-col hidden md:flex md:w-[220px] md:justify-center ">
                <div className="text-[14px] font-medium">{friend.userName}</div>
                <div className="text-[12px] text-[#a8a8a8] font-normal ">
                  {useSocketConext?.currentUsersOnline.includes(friend._id) ? (
                    <div>Online</div>
                  ) : (
                    <div>
                      Active {Math.floor(Math.random() * 24)}
                      {time[0]} ago
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {onChating._id !== currentUser._id ? (
        <Message chatWithUser={onChating} />
      ) : (
        <div className="flex flex-col flex-1 h-creen w-full">
          <div className="h-full w-full items-center justify-center flex gap-2 flex-col">
            <i className="fa-brands fa-facebook-messenger"></i>
            <p className="text-[#f5f5f5] text-[20px] font-normal ">
              Your messages
            </p>
            <p className="text-[14px] text-[#a8a8a8] font-thin">
              Send private photos and messages to a friend or group
            </p>
            <div
              className="bg-[#0095f6] px-[16px] py-[6px] rounded-lg  
            text-[#f5f5f5] text-[14px] font-medium hover:cursor-pointer hover:opacity-60"
            >
              Send message
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageLayout;
