import { useContext, useEffect, useState } from "react";
import { CustomAvatar } from "../../components/ui";
import { StoryContext } from "./Home";
import { storyProps } from "../../types";
import { handleValidSource } from "../../constants";
import { usersProps } from "../../types";
import StoryTimerBar from "./StoryTimerBar";


const StoryDetail = ({
  ownerStory,
  active,
  stories,
  usersHaveStory,
  indexOfcurrentUser,
 
}: {
  ownerStory: usersProps;
  active: boolean;
  stories: storyProps[];
  usersHaveStory: usersProps[];
  indexOfcurrentUser: number;

}) => {
  const useStoryContext = useContext(StoryContext);
  const [answer, setAnswer] = useState("");
  const [focusAnswer, setFocusAnswer] = useState(false);
  const [currentStory, setCurrentStory] = useState<storyProps>(stories[0]);
  const [lengthStory, setLengthStory] = useState(500);
  const [storyIsPlay, setStoryIsPlay] = useState(active?true:false);
  const [currentTime, setCurrentTime] = useState(0);
  const width_and_height = active
    ? "w-[300px] h-[500px]"
    : "w-[120px] h-[215px]";

  // UPDATE TIME
  useEffect(() => {
    if(active){
      const addTime = storyIsPlay ? 1 : 0;

    let updateTime = setTimeout(() => {
      setCurrentTime(currentTime + addTime);
    }, 10);

    if (currentTime >= lengthStory) {
      
      handleMoveNextStory(currentStory ? stories.indexOf(currentStory) : 0);
    }

    return () => {
      clearTimeout(updateTime);
    };

    }
    
  }, [currentTime, storyIsPlay, currentStory]);

  //RENDER VIDEO IF STORY IS VIDEO
  useEffect(() => {
    if (currentStory?.type === "video") {
      const video = document.getElementById("video-story") as HTMLVideoElement;
      if (video.src !== handleValidSource(currentStory.source)) {
        video.src = handleValidSource(currentStory.source);
        video.addEventListener("loadedmetadata", () => {
          setLengthStory(video.duration * 100);
        });
      }
    } else {
      setLengthStory(500);
    } 
    
   
  }, [currentStory]);

  // FUNCTION HANDLER
  const handlePauseStory = () => {
    if (currentStory?.type === "video") {
      const video = document.getElementById("video-story") as HTMLVideoElement;
      video.pause();
    }
    setStoryIsPlay(false);
  };

  //UNACTIVE STORY
  useEffect(()=>{
    if(active){
      setStoryIsPlay(true)
    }
    else{
      setCurrentStory(stories[0]);
      setStoryIsPlay(false);
      setCurrentTime(0);
    }
   
  },[active])

  const handlePlayStory = () => {
    if (currentStory?.type === "video") {
      const video = document.getElementById("video-story") as HTMLVideoElement;
      video.play();
    }
    setStoryIsPlay(true);
  };

  const handleMoveNextStory = (index: number) => {
    if (index < stories.length - 1) {
      setCurrentStory(stories[index + 1]);
      setStoryIsPlay(true);
    } else if(indexOfcurrentUser<usersHaveStory.length-1){
      const nextUser = usersHaveStory[indexOfcurrentUser+1 ];

      useStoryContext?.setShowStory({
        userName: nextUser.name,
        userId: nextUser._id,
      });
      setCurrentStory(stories[0]);
      setStoryIsPlay(false);
    } 
    setCurrentTime(0);
  };

  const handleMovePrevStory = (index: number) => {

    if (index > 0) {
      setCurrentStory(stories[index - 1]);
      setStoryIsPlay(true);
    } else if(indexOfcurrentUser>0) {
      const prevUser = usersHaveStory[indexOfcurrentUser-1 ];
      useStoryContext?.setShowStory({
        userName: prevUser.name,
        userId: prevUser._id,
      });
      setCurrentStory(stories[0]);
      setStoryIsPlay(false);
    }
    setCurrentTime(0);
  };
  return (
    <div
      onClick={() => {
        setFocusAnswer(false);
      }}
      className={`relative ${width_and_height}`}
    >
      {/* STORY CONTENT */}
      <div
        className={` ${width_and_height}     
       bg-black rounded-[20px] overflow-hidden`}
      >
        {stories.length > 0 &&
          (currentStory?.type === "image" ? (
            <img
              src={handleValidSource(currentStory?.source ?? "")}
              className=" object-contain w-full h-full"
            />
          ) : (
            <video id="video-story" className="w-full h-full"  autoPlay ={active}>
              Cannot open this video
            </video>
          ))}
      </div>
      {/* STORY CONTENT */}

      {/* INTERACT WITH STORY  */}

      {active && (
        <div
          className={`absolute top-0 left-0 
        flex flex-col px-[16px]  w-[300px] h-[500px] justify-between `}
        >
          {/* TOP */}
          <div className=" flex flex-col gap-3 pt-[20px] pb-[32px] ">
            <StoryTimerBar
              currentTime={currentTime}
              duration={lengthStory}
              storyList={stories}
              currentStory={currentStory ? stories.indexOf(currentStory) : 0}
            />
            <div
              className="flex flex-row justify-between
           items-center "
            >
              <div className="flex flex-row gap-2">
                <CustomAvatar
                  fullName={ownerStory.name}
                  imgg={useStoryContext?.postDict[ownerStory._id]?.imgAvatar}
                  size="w-[32px] h-[32px] "
                />
                <p className="text-white text-[14px] leading-[30px] ">
                  {useStoryContext?.postDict[ownerStory._id]?.userName}
                </p>
              </div>

              <div className="flex flex-row gap-3 items-center z-50 ">
                <i className="fa-solid fa-volume-high"></i>
                {storyIsPlay ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePauseStory();
                    }}
                  >
                    <i className="z-50 fa-solid fa-pause"></i>
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayStory();
                    }}
                  >
                    <i className="z-50 fa-solid fa-play"></i>
                  </div>
                )}
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
          {/* TOP */}

          {/* MID */}
          <div className="relative">
            <div
              className="absolute top-0 left-[-40px] w-[348px]
               h-[20px] flex flex-row justify-between"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation()

                  handleMovePrevStory(
                    currentStory ? stories.indexOf(currentStory) : 0
                  );
                }}
                className="arrow-circle-left"
              />
              <div
                onClick={(e) => {
                  e.stopPropagation()

                  handleMoveNextStory(
                    currentStory ? stories.indexOf(currentStory) : 0
                  );
                }}
                className="arrow-circle-right"
              />
            </div>
          </div>
          {/* MID */}

          {/* BOTTOM */}
          <div className="flex flex-row justify-between pt-[20px] pb-[32px] ">
            <div
              className={`${
                focusAnswer ? "w-full" : "w-[180px]"
              } rounded-[20px] h-[18px]  px-[14px] py-[18px] 
          border-white border-[1px] flex flex-row justify-between items-center`}
            >
              <input
                type="text"
                placeholder={`Trả lời ${ownerStory.userName}`}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusAnswer(true);
                }}
                className="w-[100%] h-[100%] 
              outline-none text-[#dbdbdb] text-[14px] placeholder-text-[#dbdbdb]
               px-[8px] py-[9px] bg-transparent z-50"
              />
              {answer && (
                <p className="text-white text-[15px] font-semibold">Send</p>
              )}
            </div>

            {!focusAnswer && (
              <div className="flex flex-row gap-2 justify-center items-center">
                <img
                  src={
                    ownerStory.userName
                      ? "../../public/assets/icons/like.svg"
                      : "../../public/assets/icons/liked.svg"
                  }
                />
                <i className="fa-solid fa-paper-plane"></i>
              </div>
            )}
          </div>
          {/* BOTTOM */}
        </div>
      )}
      {/* INTERACT WITH STORY  */}
    </div>
  );
};

export default StoryDetail;
