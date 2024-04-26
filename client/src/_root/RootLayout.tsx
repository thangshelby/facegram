import { Outlet } from "react-router-dom";
import { currentUserSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import { NavBar, ChangePath } from "../components/shared";
import { useState, useContext } from "react";
import { CreatePostContext } from "../App";
import CreatePost from "../components/shared/CreatePost";

const RootLayout = () => {
  const [link, setLink] = useState<string>("/");
  const currentUser = useSelector(currentUserSelector);
  const createPost = useContext(CreatePostContext);
  const isAuthenticated: boolean = currentUser.userName != "" ? false : true;

  if (!isAuthenticated) {
    return (
      <div className={`h-screen flex w-full relative overflow-hidden`}>
        <div
          className={`${createPost?.isCreatePost && "opacity-60"}
        md:h-screen  md:top-0 md:left-0  bottom-0  z-30 absolute w-full md:w-[94px] xl:w-[200px] `}
        >
          <NavBar link={link} setLink={setLink} />
        </div>

        <div className="flex-1 lg:ml-[200px] md:ml-[94px]  ">
          <Outlet />
        </div>

        {/* //SHOW CREATE POST */}
        <div
          className={
            createPost?.isCreatePost
              ? "z-10  h-screen w-full  absolute"
              : "hidden"
          }
        >
          <CreatePost />
        </div>
      </div>
    );
  } else {
    return <ChangePath path={"/auth/sign-in"} />;
  }
};

export default RootLayout;
