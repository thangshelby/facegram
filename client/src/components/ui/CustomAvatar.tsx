import { CustomAvatarProps } from "../../types/index";
import { RandomBackGroundColor } from "../../constants/index";


const CustomAvatar = ({ fullName,imgg, size }: CustomAvatarProps) => {
  const names = fullName.split(" ");
  const ranDomIndex = Math.floor(Math.random() * 8);
  return (
    <div
      className={`rounded-[50%] flex 
      justify-center items-center ${imgg?<></>: RandomBackGroundColor[ranDomIndex]}  ${
        size ? size : "w-[56px] h-[56px]"
      }`}
    >
      {imgg?
      <img src= {imgg}
      className=" w-full h-full rounded-[50%] "
      >
      
      </img>
      : 
      <h3 className={`flex flex-row bg-bg1 `}>
        {names.map((name) => {
          return (
            <p
              className={`${
                size ? `text-[18px]` : `text-[28px]`
              } text-dark-1 font-semiBold`}
              key={name}
            >
              {name[0].toLocaleUpperCase()}
            </p>
          );
        })}
      </h3>}
     

    </div>
  );
};

export default CustomAvatar;
