import { NavbarLinks } from "../../constants";
import { NavBarProps } from "../../types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CreatePostContext } from "../../App";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/selectors";
import { usersProps } from "../../types";
import React from "react";
import { logOut } from "../../_root/userSlice";
import { CustomAvatar } from "../ui";
import store from "../../redux/store";
const NavBar = React.memo(({ link, setLink }: NavBarProps) => {
  const data = useContext(CreatePostContext);
  const navigate = useNavigate();
  const currentUser: usersProps = useSelector(currentUserSelector);
  const handleChangePath = (newPath: string) => {
    if (newPath == "/profile") {
      navigate(`/profile/${currentUser.userName}`);
    } else {
      navigate(`${newPath}`);
    }
  };

  return (
    <div
      className={`md:flex-col px-[32px] md:px-[12px]
    bg-dark-2  py-[10px]  flex md:gap-5  w-full md:h-screen `}
    >
      <div
        className={`
      hidden xl:flex flex-col gap-4 xl:w-[170px] xl:h-[36px] xl:mb-[20px]`}
      >
        <img
          src="../public/assets/images/logo.svg"
          className="w-full h-[36px]"
        />
        <div className="w-full ">
          <CustomAvatar
            fullName={currentUser.userName}
            imgg={currentUser.imgAvatar}
          />
        </div>
      </div>

      <div className="flex flex-row md:gap-5 justify-between w-full md:flex-col  xl:mt-[60px]  overflow-scroll left-scrollbar">
        {NavbarLinks.map((page) => {
          return (
            <div
              key={page.label}
              className={page.route == link ? "active" : ""}
            >
              <div
                onClick={() => {
                  if (page.label == "Create Post") {
                    data?.setIsCreatePost(!data?.isCreatePost);
                  } else if (page.label == "Log Out") {
                    store.dispatch(logOut());
                    handleChangePath(page.route);
                  } else {
                    setLink(page.route);
                    handleChangePath(page.route);
                  }
                }}
                className="flex hover-pointer md:justify-center xl:justify-start page_hover xl:items-center gap-2  p-[12px] xl:p-[16px] group-hover:active"
              >
                <img
                  className={` group-hover:focus:brightness-0  min-w-[20px] min-h-[20px] group-hover:invert  ${
                    page.route == link ? "active_img" : ""
                  }`}
                  src={page.linkImg}
                  alt={page.label}
                />

                <h3 className="font-semibold hidden xl:block">{page.label}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default NavBar;
