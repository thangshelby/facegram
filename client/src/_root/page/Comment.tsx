import { CustomAvatar } from "../../components/ui";
import { currentUserSelector, getAccessToken } from "../../redux/selectors";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "./Home";
import { SocketContext } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { fetchRootComment } from "../../fetchapi/commentHandler";
import { usersProps, postProps, commentProps } from "../../types";

const Comment = ({
  postOwner,
  currentPost,
  handleSetComment,
}: {
  postOwner: usersProps;
  currentPost: postProps;
  handleSetComment: (data: string) => void;
}) => {
  const accessToken = useSelector(getAccessToken);
  const useSocketContext = useContext(SocketContext);
  const useHomeContext = useContext(HomeContext);
  const [comments, setComments] = useState<commentProps[]>([]);
  const currentUser= useSelector(currentUserSelector)
  
  useEffect(() => {
    fetchRootComment({
      accessToken,
      postId: currentPost._id,
      userId: currentUser._id,
    });
    useSocketContext?.socket?.on("fetchRootComment", (comments) => {
      setComments(comments);
    });
  }, [currentPost,useSocketContext,postOwner]);
  return (
    <div
      className="flex flex-col gap-1 w-full h-[280px] py-[16px]
   border-t-[1px] border-[#363636]"
    >
      {comments.length ? (
        <div className="flex justify-start flex-col gap-2 overflow-scroll custom-scrollbar">
          {comments.map((comment: commentProps) => {
            return (
              <div
                key={comment._id}
                className="flex flex-row justify-between
                text-white text-[14px] "
              >
                <div className="flex flex-row gap-3">
                  <CustomAvatar
                    size=" w-[32px] h-[32px]"
                    fullName={""}
                    imgg={`${
                      useHomeContext?.postDict[String(comment.userId)].imgAvatar
                    }`}
                  />

                  <div className="flex flex-col">
                    <div className="flex flex-row gap-1">
                      <p className="font-semibold">
                        {useHomeContext?.postDict[comment.userId].userName}
                      </p>
                      <p>{comment.comment}</p>
                    </div>
                    <div className="text-[12px] text-[#a8a8a8] font-medium flex flex-row gap-3">
                      <p className="font-thin">1d</p>
                      <p
                        className="hover:cursor-pointer"
                        onClick={() => {
                          handleSetComment(
                            `@${
                              useHomeContext?.postDict[comment.userId].userName
                            } ${comment._id}` 
                          );
                        }}
                      >
                        Reply
                      </p>
                    </div>
                  </div>
                </div>
                <img
                  src="../public/assets/icons/like.svg "
                  className="w-[10px] hover:cursor-pointer mt-[10px] h-[10px] mr-[20px] flex-end"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-[#f5f5f5] flex flex-col justify-center items-center gap-2">
          <div className="text-[24px] font-bold">No comments yet.</div>
          <p className="text-[14px] font-light ">Start the conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Comment;
