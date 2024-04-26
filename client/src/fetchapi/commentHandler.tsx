export const comment = async (data: {
  accessToken: string;
  postId: string;
  userId: string;
  comment: string;
  reply: boolean;
  rootComment: string;
}) => {
  await fetch(`http://localhost:5000/comment`, {
    method: "POST",
    headers: {
      AccessToken: data.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const fetchRootComment = async (data: {
  accessToken: string;
  postId: string;
  userId: string;
}) => {
  const { accessToken } = data;
  await fetch(`http://localhost:5000/comment/fetch-root-comment`, {
    method: "POST",
    headers: {
      AccessToken: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const fetchNodeComment = async (data: {
  accessToken: string;
  postId: string;
  userId: string;
  rootComment: string;
}) => {
  const { accessToken } = data;
  await fetch(`http://localhost:5000/comment/fetch-node-comment`, {
    method: "POST",
    headers: {
      AccessToken: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const unActiveOnlinePost= async (data: {
   accessToken:string,userId:string,postId:string
  }) => {
    const { accessToken } = data;
    await fetch(`http://localhost:5000/post/un-active-online-post`, {
      method: "POST",
      headers: {
        AccessToken: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  