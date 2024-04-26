import { format } from "date-fns";


export const NavbarLinks = [
  { linkImg: "./public/assets/icons/home.svg", route: "/", label: "Home" },
  // {
  //   linkImg: "./public/assets/icons/wallpaper.svg",
  //   route: "/explore",
  //   label: "Explore",
  // },
  // {
  //   linkImg: "./public/assets/icons/people.svg",
  //   route: "/alluser",
  //   label: "People",
  // },
  // {
  //   linkImg: "./public/assets/icons/saved.svg",
  //   route: "/saved",
  //   label: "Saved",
  // },
  {
    linkImg: "./public/assets/icons/people.svg",
    route: `/profile`,
    label: "My Account",
  },
  {
    linkImg: "./public/assets/icons/chat.svg",
    route: `direct/inbox/`,
    label: "Message",
  },
  {
    linkImg: "./public/assets/icons/gallery-add.svg",
    route: ``,
    label: "Create Post",
  },
  {
    linkImg: "./public/assets/icons/logout.svg",
    route: `auth/sign-in`,
    label: "Log Out",
  },

];

export const RandomBackGroundColor = [
  "bg-light-1",
  "bg-light-2",
  "bg-light-3",
  "bg-light-4",
  "bg-bg-1",
  "bg-bg-2",
  "bg-bg-3",
  "bg-bg-4",
];

export  const fileType: { [key: string]: string } = {
  mp4: "video",
  jpg: "image",
  png: "image",
  mov: "video",
};


export const handleValidSource = (source: string) => {
  return String(
    `../../public/assets/${fileType[source.split(".")[1]]}s/` +
      source.split("\\")[2]
  );
};

export const calculateTime = (Time:Date|null) => {
  const curTime = format(new Date(), "yyyy-MM-dd").split("-");
  const passTime = format(Time?Time:new Date(), "yyyy-MM-dd").split("-");
  let i = 0;
  const timeDict = ["years ago", "months ago", "days ago"];
  while (i < curTime.length) {
    if (Number(curTime[i]) != Number(passTime[i])) {
      return (
        String(Number(curTime[i]) - Number(passTime[i])) + " " + timeDict[i]
      );
    }
    i += 1;
  }
};

