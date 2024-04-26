export const createPosts = async (data: {
  userId: string;
  userName: string;
}) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  const res = await fetch("http://127.0.0.1:8000/scrap-info", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json() )
    .then((response) => {
      return response;
    });
  return res;
};
