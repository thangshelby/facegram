import { useState } from "react";

const ScrapData = () => {
    const [requestInfro,setRequetInfo]= useState<{
        linkScrap:string,
        postsNumber:string,
        imgAvatar:boolean

}>({linkScrap:'',postsNumber:'',imgAvatar:false})
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex flex-col gap-3"
    > 
  
  <div className="w-full flex flex-col">
    <label className="shad-form_label">Link to scraping </label>
    <input
      className="shad-input rounded-lg"
      value={requestInfro.linkScrap}
      name="linkscrap"
      onChange={(e) => setRequetInfo({...requestInfro,linkScrap:e.target.value})}
    />
  </div>
  <div className="w-full flex flex-row gap-3">
    <label className="shad-form_label">Do you want to take image Avatar ?</label>
    <input
      checked={requestInfro.imgAvatar}
      type="checkbox"
      name="imgAvatar"
      onChange={(e) => setRequetInfo({...requestInfro,imgAvatar:e.target.checked})}
    />
  </div>
  <div className="w-full flex flex-col">
    <label className="shad-form_label">How many posts you want to get ?</label>
    <input
      className="shad-input rounded-lg"
      value={requestInfro.postsNumber}
      name="postsnumber"
      onChange={(e) => setRequetInfo({...requestInfro,postsNumber:e.target.value})}
    />
  </div>
  
      {/* <button className="mt-5" onClick={handleEndScrap}>Close</button> */}
    </div>
  );
};

export default ScrapData;
