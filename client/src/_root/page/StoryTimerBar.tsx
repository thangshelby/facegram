import { useState, useEffect } from "react";
import { storyProps } from "../../types";

function StoryTimerBar({
  currentTime,
  duration,
  storyList,
  currentStory,
}: {
  currentTime: number;
  duration: number;
  storyList: storyProps[];
  currentStory: number;
}) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress((currentTime / duration) * 100);
  }, [currentTime]);

  useEffect(() => {
    setProgress((currentTime / duration) * 100);
  }, [currentTime, duration]);

  return (
    <div className="w-[100%] h-[2px] flex flex-row justify-between">
      {storyList.map((story, index) => (
        <div
          key={story.source}
          style={{width: `${99/ storyList.length}%`}}
          className={`p-[1px] rounded-[2px] 
          h-[2px] bg-gray-500 overflow-hidden`}
        >
          <div
            style={
              index == currentStory
                ? { width: `${progress}%` }
                : index < currentStory
                ? { width: "100%" }
                : { width: "0%" }
            }
            className="h-[2px] bg-white "
          ></div>
        </div>
      ))}
    </div>
  );
}

export default StoryTimerBar;
