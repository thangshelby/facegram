import {FollowLayoutProps } from "../../types";
import { ShowFriends } from ".";
import React,{ useState } from "react";

const FollowLayout =React.memo(({isShow,setIsShow,admin }:FollowLayoutProps) => {
  
  const [search, setSearch] = useState("");
  const [focus,setFocus]=useState(false)
  return (
    <div 
    onClick={(e)=>{
      setFocus(false)
      e.stopPropagation()}}
    className="z-10  absolute left-[35%] top-[10%]  w-[440px] h-[440px] box-border p-[20px]">
      
      <div className="w-full h-full bg-[#262626] rounded-[20px] flex flex-col">
        {/* TITLE */}
        <div
          className="relative h-[40px] font-semibold 
          flex items-center justify-center 
          border-b-[1px] border-[#363636]
          "
        >
          <h1>{isShow.type}</h1>
          <i onClick={()=>{
                setIsShow({check:!isShow.check,type:''});
          }} 
          className="absolute right-[10px]  fa-solid fa-x w-[15px] h-[15px]"></i>
        </div>
        
        {/* SEARCH BAR */}
        <div className="flex items-center justify-center flex-row w-full wrap h-[48px] px-[16px] py-[8px] ">
          {focus==false&&search=='' &&<i className="opacity-50 fa-solid fa-magnifying-glass"></i>}
          <input
            value={search}
            className="pl-[4px] pr-[16px] py-[3px] bg-[#262626]
             text-[#fff] w-full placeholder:opacity-50 placeholder:font-thin "
            type="text"
            name="Search"
            placeholder="Search "
            onClick={(e)=>{
              e.stopPropagation()
              setFocus(!focus)}}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          { search!=''&& <i onClick={(e)=>{
            e.stopPropagation()
          setSearch('')}} 
          className="absolute right-[45px] fa-solid fa-x w-[15px] h-[15px]"/>}
        </div>

        {/*FRIENDS  */}
        <div className="overflow-y-scroll h-full ">
          <ShowFriends type={isShow.type} searchFilter={search}  admin={admin} setIsShow={setIsShow} />
        </div>
      </div>
    </div>
  );
}
)
export default FollowLayout;
