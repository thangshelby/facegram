export const getConversation = async (data: {
  accessToken: string;
  senderId: string;
  receiverId: string;
}) => {
  const { accessToken, senderId, receiverId } = data;
  await fetch(`http://localhost:5000/chat`, {
    method: "POST",
    headers: {
      AccessToken: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senderId, receiverId }),
  });
};

export const sendMessage = async (data: {
  accessToken: string;
  senderId: string;
  receiverId: string;
  message: string;
}) => {
  const { accessToken } = data;
  await fetch(`http://localhost:5000/chat/send-message`, {
    method: "POST",
    headers: {
      AccessToken: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
