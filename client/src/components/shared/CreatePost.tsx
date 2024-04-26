import { useContext,useState } from "react";
import { CreatePostContext} from "../../App";
import { CustomButton } from "../ui";
import { currentUserSelector ,getAccessToken} from "../../redux/selectors";
import { useSelector } from "react-redux";
import { createPost } from "../../_root/postSlice";
import { usersProps } from "../../types";
import store from "../../redux/store";


const CreatePost = () => {
  // VARIABLE
  const accessToken= useSelector(getAccessToken)
  const createPostt = useContext(CreatePostContext);
  
  const [moreInfo, setMoreInfo] = useState(false);

  const currentUser:usersProps= useSelector(currentUserSelector)


  const [postInfo,setPostInfo]= useState({
    userId:currentUser._id,
    message:"",
    tags:"",
    place:"",
    imageUrl:"",
  })


  // FUNCTION HANDLER
  const handleFileImg = (filePath: string) => {
    const filePathList = filePath.split(`\\`);
    const validFilePath =
      "/public/assets/images/" + filePathList[filePathList.length - 1];
    setPostInfo({...postInfo,imageUrl:validFilePath});
  };
  const handleSubmitPost = () => {
    
    store.dispatch(createPost( {accessToken,postInfo}))
   
    setPostInfo({

      userId:currentUser._id,
      message:"",
      tags:"",
      place:"",
      imageUrl:"",
    })

    createPostt?.setIsCreatePost(false)
    
  };

  return (
    <div className="h-screen flex  items-center justify-center">
      <div
        className="absolute top-5  w-[15px] h-[15px] right-5"
        onClick={() => createPostt?.setIsCreatePost(false)}
      >
        <i className="fa-solid fa-x w-[15px] h-[15px]"></i>
      </div>
      <div className="px-[20px] py-[20px] rounded-lg bg-dark-3 ">
        <div
          className="page-container min-w-[348px] 
        min-h-[200px] gap-3"
        >
          {/* TITLE */}
          <div className="flex gap-3 justify-between items-center">
            <div className="page__title">Create Post</div>
            <div>
              {postInfo.imageUrl ? (
                <i
                  className="fa-solid fa-arrow-right"
                  onClick={() => {
                    setMoreInfo(true);
                  }}
                ></i>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* FORM POST INPUT */}
          <form className="flex-col flex gap-3">
            {postInfo.imageUrl ? (
              <div className="flex items-center justify-center gap-3">
                <img
                  src={postInfo.imageUrl}
                  className="w-[348px] h-[200px] object-cover rounded-lg"
                />
                {/* FILL MORE INFOR */}
                {moreInfo ? (
                  <div
                    className=" flex flex-col 
                  w-[348px] gap-2 items-end"
                  >
                    {/* FIELD1 */}
                    <div className="flex flex-col w-full gap-1">
                      <label>Message</label>
                      <input
                        type="text"
                        name="message"
                        value={postInfo.message}
                        onChange={(e) => setPostInfo({...postInfo,message:e.target.value})}
                        className="bg-dark-4 outline-none p-[10px] rounded-lg break-word "
                      />
                    </div>
                    {/* FIELD2 */}

                    <div className="flex flex-col w-full gap-1">
                      <label>Place</label>
                      <input
                        type="text"
                        name="place"
                        value={postInfo.place}
                        onChange={(e) => setPostInfo({...postInfo,place:e.target.value})}
                        className="bg-dark-4 outline-none p-[10px] rounded-lg break-word "
                      />
                    </div>
                    {/* FIELD3 */}
                    <div className="flex flex-col w-full gap-1">
                      <label>Tags</label>
                      <input
                        type="text"
                        name="tags"
                        value={postInfo.tags}
                        onChange={(e) => setPostInfo({...postInfo,tags:e.target.value})}
                        className="bg-dark-4 outline-none p-[10px] rounded-lg break-word "
                      />
                    </div>

                    <div className="mt-[10px] ">
                      <CustomButton
                        // btnType="submit"
                        titile="Shared"
                        textStyles="font-semiBold"
                        containerStyles="bg-primary-500 focus:bg-blue-300
                        px-[15px] py-[10px] rounded-lg"
                        handleClick={handleSubmitPost}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              // DEFAULT PICTURE
              <div className="flex flex-col items-center">
                <div className="flex w-[225px] h-[200px] rounded-xl overflow-hidden">
                  <img
                    src="/public/assets/icons/add-post.svg"
                    className="object-cover"
                  />
                </div>
                <div></div>
              </div>
            )}
            {/* BUTTON SELECT PICTURE */}
            <input
              type="file"
              className="bg-dark-3 outline-none  focus:rounded-red"
              onChange={(e) => handleFileImg(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
