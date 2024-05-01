import { Routes, Route } from "react-router-dom";
import SignInForm from "./_auth/form/SignInForm";
import SignUpForm from "./_auth/form/signup/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import PostDetail from "./_root/page/PostDetail";
import { useState, createContext } from "react";
import "./Global.css";
import "./global2.css";
import {
  AllUsers,
  Profile,
  UpdatePost,
  Home,
  MessageLayout,
  StoryDetailList
} from "./_root/page/index";

export const CreatePostContext = createContext<
  createPostContextProps | undefined
>(undefined);
export interface createPostContextProps {
  isCreatePost: boolean;
  setIsCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

const App = () => {
  const [link, setLink] = useState<string>("/");
  const [isCreatePost, setIsCreatePost] = useState(false);

  const createPost: createPostContextProps = {
    isCreatePost,
    setIsCreatePost,
    link,
    setLink,
  };

  return (
    <CreatePostContext.Provider value={createPost}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>

        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />}>
            <Route path="/post-detail/:id" element={<PostDetail />} />
            <Route path="/stories/:userName/:userId" element={<StoryDetailList />} />
          </Route>
          <Route path="/direct/inbox" element={<MessageLayout />} />
          <Route path="/direct/inbox/:id" element={<MessageLayout />} />
          <Route path="/alluser" element={<AllUsers />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/profile/:userName" element={<Profile />} />
        </Route>
      </Routes>
    </CreatePostContext.Provider>
  );
};

export default App;
