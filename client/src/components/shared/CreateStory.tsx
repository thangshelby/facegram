import React, { useEffect, useState } from "react";
import { createStory } from "../../fetchapi/story";
import { useSelector } from "react-redux";
import { getAccessToken, currentUserSelector } from "../../redux/selectors";
import { fileType, handleValidSource } from "../../constants";
import { RandomBackGroundColor } from "../../constants";

export const CreateStory = ({ handler }: { handler: () => void }) => {
  const accessToken = useSelector(getAccessToken);
  const currentUser = useSelector(currentUserSelector);
  const storyInfoInit = {
    type: "",
    source: "",
    userId: currentUser._id,
    content: "",
    sound: "",
    size: { width: 0, height: 0 },
    position: { x: 0, y: 0 },
  };

  const [storyInfo, setStoryInfo] = useState(storyInfoInit);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [cliclPoint, setClickPoint] = useState({ x: 0, y: 0 });
  const [storySize, setStorySize] = useState({ width: 0, height: 0 });
  const [scaleStory, setScaleStory] = useState(2);
  const backgroundList = [
    ...RandomBackGroundColor
  ];
  const [background, setBackGround] = useState<string>(backgroundList[0]);
  const [changeBackground, setChangeBackground] = useState(false);
  console.log(backgroundList)
  useEffect(() => {
    if (storyInfo.source != "") {
      const img = new Image();
      img.src = handleValidSource(storyInfo.source);

      img.onload = () => {
        setScaleStory(
          Math.abs(img.width - 250) > Math.abs(img.height - 400)
            ? img.width / 250
            : img.height / 400
        );
        setStorySize({
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [storyInfo]);

  const handleSetPosition = (event: React.MouseEvent) => {
    setPosition({
      x: position.x + (event.clientX - cliclPoint.x),
      y: position.y + (event.clientY - cliclPoint.y),
    });
    setClickPoint({ x: 0, y: 0 });
  };
  const handleCreateStory = () => {
    createStory({ accessToken, ...storyInfo });
    setStoryInfo(storyInfoInit);
    handler();
  };

  return (
    <div
      className="fixed w-[1280px] 
    h-screen center z-50 top-[0] left-[0] "
    >
      <div className="w-full h-full absolute bg-black opacity-60"></div>
      <div
        className="relative  w-[350px] rounded-[18px]  min-h-[350px] 
      p-[20px] bg-[#101012] flex flex-col gap-3 justify-evenly items-center 
      opacity-unset overflow-hidden"
      >
        {/* CLOSE BUTTON */}
        <div
          className="absolute w-[13px] h-[13px ] 
      top-[10px] right-[10px]"
          onClick={handler}
        >
          <i className="fa-solid fa-x"></i>
        </div>
        {/* CLOSE BUTTON */}

        <h3 className="text-white font-semibold text-[20px]">Add Your Story</h3>

        {!storyInfo.type ? (
          <i className="fa-solid fa-camera fa-6x"></i>
        ) : (
          <div
            onClick={() => {
              setChangeBackground(!changeBackground);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              handleSetPosition(e);
            }}
            className={`${background} relative w-[250px] h-[400px]
          rounded-2xl   flex items-center justify-center`}
          >
            {changeBackground && (
              <div
                className="absolute top-0 right-[-100px] 
            w-[100px] h-[50px] "
              >
                <div className="flex flex-row justify-center
                 items-center  gap-x-1">
                {backgroundList.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log(color);
                        setBackGround(color);
                        setChangeBackground(false);
                      }}
                      className={`w-[28px] rounded-[50%] h-[20px]
                       hover-pointer ${color}`}
                  
                    ></div>
                  );
                })}
                  </div>
                
              </div>
            )}

            {storyInfo.type === "video" ? (
              <video className="w-full h-full hover-pointer" autoPlay>
                <source
                  src={handleValidSource(storyInfo.source)}
                  type="video/mp4"
                />
                Cannot open this video
              </video>
            ) : (
              <div
                style={{
                  width: `${(storySize.width / 2) * (scaleStory + 1)}px`,
                  height: `${(storySize.height / 2) * (scaleStory + 1)}px`,
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                }}
                className={`absolute z-50 hover-pointer
              ${(storySize.width / 2) * (scaleStory + 1) > 250 && "opacity-100"}
              `}
              >
                <img
                  id="image"
                  onMouseDown={(e) => {
                    setClickPoint({ x: e.clientX, y: e.clientY });
                  }}
                  onDrag={(e) => {
                    e.preventDefault();
                  }}
                  className="w-full h-full z-50"
                  src={handleValidSource(storyInfo.source)}
                />
              </div>
            )}
          </div>
        )}

        {/* SUBMIT/INPUT BUTTON */}
        {storyInfo.source ? (
          <div
            className="relative flex flex-col 
            w-full gap-8 py-[8px] items-center"
          >
            <div
              className=" flex flex-row
             justify-between gap-3 items-center"
            >
              <i
                onClick={() => {
                  if (scaleStory > 0) {
                    setScaleStory(scaleStory - 1);
                  }
                }}
                className="fa-solid fa-minus"
              ></i>

              <div className="relative">
                <div
                  className=" w-[200px] h-[8px] rounded-2xl
                 flex flex-row overflow-hidden bg-gray-400"
                >
                  <div
                    style={{ width: `${scaleStory * 10}%` }}
                    className={`h-[8px] bg-blue-400`}
                  />
                </div>
                <div
                  style={{ left: `${scaleStory * 10}%` }}
                  className={`absolute top-[-4px] w-[16px] 
                h-[16px] rounded-[50%] bg-white`}
                />
              </div>

              <i
                onClick={() => {
                  if (scaleStory < 10) {
                    setScaleStory(scaleStory + 1);
                  }
                }}
                className="fa-solid fa-plus"
              ></i>
            </div>

            <div
              className="absolute w-[350px] top-10
            left-[-20px] border-top-solid border-[1px] border-white"
            ></div>

            <div
              onClick={handleCreateStory}
              className="text-[#0095f6] text-[14px] 
            font-semibold hover-pointer"
            >
              Done
            </div>
          </div>
        ) : (
          <input
            className="ml-[30px]"
            value={storyInfo.source}
            onChange={(e) => {
              const path = e.target.value;
              setStoryInfo({
                ...storyInfo,
                type: fileType[path.split(".")[1]],
                source: path,
              });
            }}
            type="file"
          />
        )}
        {/* SUBMIT BUTTON */}
      </div>
    </div>
  );
};
/* 
<i class="fa-solid fa-plus"></i>
<i class="fa-solid fa-minus"></i>
*/
