export const getUser = async (data: {
  accessToken: string;
  senderId: string;
  receiverId: string;
}) => {
  const response = await fetch(`http://localhost:5000/user`, {
    method: "PUT",
    headers: {
      AccessToken: data.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getUsers = async (data: {
  accessToken: string;
  userId: string;
  type: string;
  userList: string[];
}) => {
  const { accessToken} = data;

    const response = await fetch(`http://localhost:5000/user/get-users`, {
      method: "PUT",
      headers: {
        AccessToken: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
};

export const getSuggestFriends = async (data: {
  accessToken: string;
  userId: string;
}) => {
  const { accessToken } = data;
  const response = await fetch(`http://localhost:5000/user/get-suggest`, {
    method: "PUT",
    headers: {
      AccessToken: accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// export const SocialMediaInteraction = async (data: {
//   accessToken: string;
//   owner: string;
//   friend: string;
//   type: string;
// }) => {
//   const { accessToken } = data;
//   await fetch(
//     `http://localhost:5000/user/interactions
// `,
//     {
//       method: "POST",
//       headers: {
//         AccessToken: accessToken,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );
// };
