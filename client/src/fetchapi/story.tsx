export const createStory = async (data: {
  accessToken: string;
  type: string | "video";
  source: string;
  userId: string;
  content: string | "";
  sound: string | "";
}) => {
  const { accessToken } = data;
  const response = await fetch("http://localhost:5000/story/create-story", {
    method: "POST",
    headers: {
      accessToken: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getUsersHaveStory = async (data: {
  accessToken: string;
  ownerId: string;
  userFollowingList: string[];
}) => {
  const response = await fetch(
    "http://localhost:5000/story/get-users-have-story",
    {
      method: "POST",
      headers: {
        accessToken: data.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const getUsersStories = async (data: {
  accessToken: string;
  ownerId: string;
  userFollowingList: string[];
}) => {
  const response = await fetch(
    "http://localhost:5000/story/get-users-stories",
    {
      method: "POST",
      headers: {
        accessToken: data.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const getStories = async (data: {
  accessToken: string;
  ownerStoryId: string;
  receiverId: string;
}) => {
  const response = await fetch("http://localhost:5000/story/get-stories", {
    method: "POST",
    headers: {
      accessToken: data.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
