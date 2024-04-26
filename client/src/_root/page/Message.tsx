import { CustomAvatar } from "../../components/ui";
import { usersProps, messageProps } from "../../types";
import { useSelector } from "react-redux";
import {
  currentUserSelector,
  getAccessToken,
} from "../../redux/selectors";
import {sendMessage } from "../../fetchapi/messageHandler";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

const Message = ( {chatWithUser} :{chatWithUser:usersProps}) => {
  const useSocketConext = useContext(SocketContext);
  const currentUser: usersProps = useSelector(currentUserSelector);
  const time = { 0: "m", 1: "h" };
  const accessToken = useSelector(getAccessToken);

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<messageProps[]>([]);

  // FUNCTION HANDLER

  useEffect(() => {
    useSocketConext?.socket?.on("getConversation", (conversation) => {
      setConversation(conversation);
    });
    useSocketConext?.socket?.on("sendMessage", (message) => {
      setConversation([...conversation, message]);
    });
  }, [useSocketConext?.socket, conversation,chatWithUser]);

  const handleSendMessage = () => {
    sendMessage({
      accessToken,
      senderId: currentUser._id,
      receiverId:chatWithUser._id,
      message,  
    });
    setMessage("");
  };
  return (
    <div className="flex flex-col flex-1 h-creen">
      <div className="flex flex-row justify-between items-center w-full  px-[24px] py-[16px] border-b-[1px] border-[#363636]">
        <div className="w-full flex flex-row  gap-2">
          <CustomAvatar
            fullName={chatWithUser.userName}
            imgg={chatWithUser.imgAvatar}
            size={"w-[56px] h-[56px]"}
          />
          <div className="flex flex-col justify-center ">
            <div className="text-[16px] font-medium">
              {chatWithUser.userName}
            </div>
            <div className="text-[12px] text-[#a8a8a8] font-normal ">
              {useSocketConext?.currentUsersOnline.includes(
                chatWithUser._id
              ) ? (
                <div className="flex flex-row gap-1 items-center">
                  <div className="rounded-[50%] bg-green-600 w-[5px] h-[5px]"></div>
                  <p>Online </p>
                </div>
              ) : (
                <div>
                  {" "}
                  Active {Math.floor(Math.random() * 24)}
                  {time[0]} ago
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 hover:cursor-pointer">
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <div>
        {/* CONVERSATIONS */}
        <div
          className="flex flex-col w-full 
        justify-between h-full box-border px-[20px]"
        >
          <div className=" h-[340px] md:h-[400px] overflow-y-scroll  ">
            {conversation.length ? (
              <div className="flex flex-col gap-1 w-full">
                {conversation.map((message) => (
                  <div
                    key={message._id}
                    className={`flex  flex-row 
                  items-center  ${
                    currentUser._id == message.senderId
                      ? " justify-end"
                      : " justify-start "
                  }`}
                  >
                    {currentUser._id != message.senderId && (
                      <CustomAvatar
                        fullName={chatWithUser.userName}
                        imgg={chatWithUser.imgAvatar}
                        size="w-[28px] h-[28px]"
                      />
                    )}
                    <div
                      className={`text-white ml-[5px] px-[12px] py-[7px] text-[15px] font-medium rounded-[20px]  ${
                        currentUser._id == message.senderId
                          ? "bg-[#3797f0]"
                          : "bg-[#262626] "
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <CustomAvatar
                  fullName={chatWithUser.userName}
                  imgg={chatWithUser.imgAvatar}
                  size="w-[96px] h-[96px]"
                />
                <div className="text-[20px] text-[#f5f5f5] font-semibold">
                  {chatWithUser.userName}
                </div>
                <p className="text-[14px] text-[#a8a898] font-normal">
                  {chatWithUser.name} Instagram
                </p>
                <button className="hover:cursor-pointer hover:opacity-50   px-[14px] py-[7px] bg-[#363636] rounded-[8px]">
                  <p className="font-semibold text-[14px] text-[#f5f5f5] ">
                    View profile
                  </p>
                </button>
              </div>
            )}
          </div>

          <div
            className="relative w-full px-[16px] border-[1px] 
            border-[rgb(52,52,52)] rounded-[25px] mb-[20px] "
          >
            <i className="absolute bottom-3 fa-regular fa-face-smile  "></i>
            <input
              className="placeholder:text-[14px] w-full outline-none bg-dark-1
             placeholder:text-[#8a8e8e] placeholder:font-normal  px-[26px] py-[10px] mr-[20px]"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            {message ? (
              <div
                onClick={()=>handleSendMessage()}
                className="absolute bottom-3 right-[20px] hover:cursor-pointer hover:text-white text-[14px] font-semibold text-blue-500"
              >
                Send
              </div>
            ) : (
              <div className="absolute  hover:cursor-pointer  flex flex-row gap-2 bottom-[14px] right-3">
                <i className=" fa-solid fa-microphone"></i>
                <i className=" fa-regular fa-image"></i>
                <i className=" fa-regular fa-heart"></i>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Message;
