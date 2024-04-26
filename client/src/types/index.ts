import { MouseEventHandler, Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface CustomButtonProps {
  btnType?: "button" | "submit";
  titile: string;
  containerStyles: string;
  textStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
export interface NavBarProps {
  link: string;
  setLink: (link: string) => void;
}
export interface CustomAvatarProps {
  fullName?: string;
  imgg?: string;
  size?: string;
}

export interface usersProps {
  _id: string;
  userName: string;
  name: string;
  email: string;
  posts: [];
  followers: string[];
  followings: string[];
  imgAvatar: string;
}

export interface postProps {
  _id: string;
  userId: string;
  tags: [];
  place: string;
  message: string;
  imageUrl: string;
  comments: string[];
  liked: string[];
  createdAt: Date | null;
}

export interface ChanePathProps {
  path: string;
}

export interface FollowLayoutProps {
  isShow: {
    check: boolean;
    type: "" | "Followers" | "Followings";
  };
  setIsShow: Dispatch<
    SetStateAction<{ check: boolean; type: "" | "Followers" | "Followings" }>
  >;
  admin:usersProps
}

export interface ShowFriendsProps {
  type: "Followers" | "Followings" | "Suggest" | "";
  searchFilter: string;
  admin?:usersProps
  setIsShow?: Dispatch<
  SetStateAction<{ check: boolean; type: "" | "Followers" | "Followings" }>
>;
}

export interface messageProps {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
}
export interface commentProps{
  _id:string,
  userId:string,
  postId:string,
  comment:string,
  reply:boolean,
  rootComment:string
  createdAt:Date
}

export type postDict = {
  [key: string]: usersProps;
};

export type storyProps = {
  type: string,
  source: string,
  userId: string,
  content: string,
  sound: string,
}


export type HomeContextProps = {
  showPostDetail: string;
  setShowPostDetail: Dispatch<SetStateAction<string>>;
  user: usersProps;
  setUser: Dispatch<SetStateAction<usersProps>>;
  postDict: postDict;
};

export interface ServerToClientEvents {
  getOnlineUsers: (users: []) => void;
  sendMessage: (message: messageProps) => void;
  getConversation: (conversation: messageProps[]) => void;
  sendComment:(newComment:commentProps)=>void
  fetchRootComment: (comments:commentProps[])=>void
  getUser:(user:usersProps)=>void
  getUsers:(userList:usersProps[])=>void;
  getAllUsers:(userList:usersProps[])=>void
  getSuggestFriends:(userList:usersProps[])=>void
  usersHaveStory:(userList:usersProps[])=>void
  usersStories:(usersStories: {[key:string]:storyProps[]})=>void
  stories:(story:storyProps[])=>void

}

export interface ClientToServerEvents {
  disconnect: () => void;
}
export type SocketContextProps = {
  socket: null | Socket<ServerToClientEvents, ClientToServerEvents>;

  currentUsersOnline: string[];
};
