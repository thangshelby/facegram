import { getHomeFeed } from "../postSlice";
import { useSelector } from "react-redux";
import {
  postsSelector,
  currentUserSelector,
  getAccessToken,
  allUsersSelector,
} from "../../redux/selectors";
import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";
import { ShowFriends, Post } from ".";
import { StoryBar } from "../../components/shared";
import store from "../../redux/store";
import { Outlet } from "react-router-dom";
import { usersProps, postProps } from "../../types";
import { getAllUsers } from "../userSlice";

export type HomeContextProps = {
  showPostDetail: string;
  setShowPostDetail: Dispatch<SetStateAction<string>>;
  postDict: { [key: string]: usersProps };
};

export const HomeContext = createContext<HomeContextProps | null>(null);

export type StoryContextProps = {
  showStory: { userName: string; userId: string };
  setShowStory: Dispatch<SetStateAction<{ userName: string; userId: string }>>;
  postDict: {[key: string]: usersProps } ;
};

export const StoryContext = createContext<StoryContextProps | null>(null);

const Home = () => {
  const currentUser: usersProps = useSelector(currentUserSelector);
  const postMapAccount: { [key: string]: usersProps } =
    useSelector(allUsersSelector);
  const accessToken: string = useSelector(getAccessToken);
  const posts: postProps[] = useSelector(postsSelector);
  const [showPostDetail, setShowPostDetail] = useState<string>("");
  const [showStory,setShowStory]= useState<{userName:string,userId:string}>({userName:'',userId:''})

  useEffect(() => {
    // GET HOME FEED
    store.dispatch(
      getHomeFeed({
        accessToken,
        userId: currentUser._id,
        userName: currentUser.name,
      })
    );

    // GET ALL USERS
    store.dispatch(getAllUsers(accessToken));

  }, [currentUser, accessToken]);

  return (
    <HomeContext.Provider
      value={{
        showPostDetail,
        setShowPostDetail,
        postDict: postMapAccount,
      }}
    >
      <StoryContext.Provider value={{
        showStory,
        setShowStory,
        postDict:postMapAccount
      }}>
        <div
          onClick={() => {
            setShowPostDetail("");
          }}
          className=" flex flex-row w-full "
        >
          <div
            className={`${
              showPostDetail && "opacity-30"
            } px-[65px] py-[20px] w-full flex flex-col  items-center lg:w-[70%]  
          overflow-scroll relative
          custom-scrollbar h-screen`}
          >
            <div className="l-[65px] w-[630px] absolute">
              <StoryBar />
            </div>

            <h2 className="ml-[15x] mt-[86px] flex-start page__title mb-2">
              Home Feed
            </h2>

            <div className="max-w-[600px] flex flex-col gap-8">
              {posts && postMapAccount ? (
                posts.map((post: postProps, index) => {
                  return (
                    <div key={index}>
                      <Post
                        post={post}
                        index={index}
                        account={
                          post.userId in postMapAccount
                            ? postMapAccount[post.userId]
                            : currentUser
                        }
                      />
                    </div>
                  );
                })
              ) : (
                <div className="lds-dual-ring"></div>
              )}
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="hidden lg:block ">
            <ShowFriends type="Suggest" searchFilter="" />
          </div>

          <Outlet />
        </div>
      </StoryContext.Provider>
    </HomeContext.Provider>
  );
};

export default Home;
