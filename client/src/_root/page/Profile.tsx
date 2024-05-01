import { CustomAvatar } from "../../components/ui";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currentUserSelector, postsSelector } from "../../redux/selectors";
import { useEffect, useState, useContext } from "react";
import { getPostsByUserId } from "../postSlice";
import { updateProfile, userNameMapUserID } from "../userSlice";
import store from "../../redux/store";
import { usersProps, postProps, SocketContextProps } from "../../types";
import { FollowLayout } from ".";
import { getAccessToken } from "../../redux/selectors";
import { SocketContext } from "../../context/SocketContext";
import { getUsers, getUser } from "../../fetchapi/userHandler";
import { SocialMediaInteraction } from "../userSlice";

type followTypeProps = "" | "Followers" | "Followings";

const Profile = () => {
  const accessToken = useSelector(getAccessToken);
  const useSocketContext: SocketContextProps | null = useContext(SocketContext);
  const param = useParams().userName;
  const currentUser: usersProps = useSelector(currentUserSelector);

  const [admin, setAdmin] = useState<usersProps>(currentUser);

  useEffect(() => {
    if (param != undefined && param in userNameMapUserID) {
      getUser({
        accessToken,
        senderId: currentUser._id,
        receiverId: userNameMapUserID[param],
      });
    }
    useSocketContext?.socket?.on("getUser", (user) => {
      setAdmin(user);
    });
  }, [useSocketContext, param, accessToken, currentUser]);

  const [isShow, setIsShow] = useState<{
    check: boolean;
    type: followTypeProps;
  }>({ check: false, type: "" });

  const [isChange, setIsChange] = useState(false);
  const [imgAvatarr, setImgAvatarr] = useState("");

  useEffect(() => {
    store.dispatch(getPostsByUserId({ accessToken, userId: admin._id }));
  }, [admin, accessToken]);

  //Update Avatar
  useEffect(() => {
    if (imgAvatarr != "") {
      const data = {
        accessToken,
        _id: admin._id,
        link: admin.imgAvatar,
      };
      store.dispatch(updateProfile(data));
      setIsChange(!isChange);
      setImgAvatarr("");
    }
  }, [admin, imgAvatarr, isChange, accessToken]);

  const handlegetUsers = (type: followTypeProps) => {
    getUsers({
      accessToken,
      userId: currentUser._id,
      userList: type == "Followers" ? admin.followers : admin.followings,
      type: "getUsers",
    });
    setIsShow({ check: true, type });
  };

  const handleSocialMediaInteraction = (
    owner: string,
    friend: string,
    type: "removeFollow" | "unFollow" | "follow"
  ) => {
    store.dispatch(
      SocialMediaInteraction({ accessToken, owner, friend, type })
    );
  };

  const myPostList: postProps[] = useSelector(postsSelector);
  return (
    <div
      onClick={() => {
        setIsShow({ check: false, type: "" });
      }}
      className={`z-10 h-screen w-full flex flex-col overflow-scroll  
   gap-5 p-[30px] mb-[20px]`}
    >
      {/* SHOW FOLLOW LAYOUT */}
      {isShow.check && (
        <div className="box-border no-opacity z-2 w-full h-full">
          <FollowLayout isShow={isShow} setIsShow={setIsShow} admin={admin} />
        </div>
      )}
      {/* SHOW FOLLOW LAYOUT */}

      {/* CHANE IMAGE AVATAR  */}
      {isChange && admin._id == currentUser._id && (
        <input
          accept="file"
          type="file"
          onChange={(e) => {
            setImgAvatarr(e.target.value);
          }}
        ></input>
      )}
      {/* CHANE IMAGE AVATAR  */}

      {/* PROFILE INFO */}
      <div className={`${isShow.check && "opacity-50"}  flex flex-row `}>
        <div
          onClick={() => setIsChange(!isChange)}
          className="flex items-center justify-center 
        w-[290px] h-[150px] hover-pointer"
        >
          <CustomAvatar
            fullName={admin.userName}
            imgg={admin.imgAvatar}
            size={"h-[150px] w-[150px] rounded-[50%]"}
          />
        </div>

        <div className="flex flex-col justify-evenly text-[16px] ">
          <div className="flex flex-row gap-5 leading-8">
            <p>{admin.userName}</p>
            {admin._id == currentUser._id ? (
              <div className="hover-pointer px-[16px] font-semibold  bg-[#363636] rounded-lg ">
                Update Profile
              </div>
            ) : (
              <div className="hover-pointer px-[16px] font-semibold  bg-[#0095f6] rounded-lg ">
                {currentUser.followings.length > 0 &&
                currentUser.followings.includes(admin._id) ? (
                  <div
                    onClick={() => {
                      handleSocialMediaInteraction(
                        currentUser._id,
                        admin._id,
                        "unFollow"
                      );
                    }}
                  >
                    Following
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      handleSocialMediaInteraction(
                        currentUser._id,
                        admin._id,
                        "unFollow"
                      );
                    }}
                  >
                    Follow
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-row gap-5">
            <div className="hover-pointer">
              <p className="font-semibold inline-block">{myPostList.length}</p>{" "}
              posts
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                handlegetUsers("Followers");
              }}
              className="hover-pointer"
            >
              {" "}
              <div className="font-semibold inline-block">
                {admin.followers.length}
              </div>{" "}
              followers
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                handlegetUsers("Followings");
              }}
              className="hover-pointer"
            >
              {" "}
              <p className="font-semibold inline-block">
                {admin.followings.length}
              </p>{" "}
              following
            </div>
          </div>

          <div className="font-semibold flex flex-row gap-5">
            <h4>{admin.name}</h4>
          </div>
        </div>
      </div>
      {/* PROFILE INFO */}

      {/* PROFILE POST */}
      <div className="px-[30px]">
        <div
          className={`${
            isShow.check && "opacity-50"
          }   border-t-[1px] border-[#363636] my-[20px]`}
        >
          <div
            className="w-[100%]  flex flex-row overflow-hidden flex-wrap 
            py-[20px] justify-between gap-y-[6px]"
          >
            {myPostList.map((post) => (
              <img
                className="w-[32.9%] xl:h-[307px] h-[80%] hover-pointer 
                hover:opacity-70"
                key={post._id}
                src={post.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE POST */}
    </div>
  );
};

export default Profile;
