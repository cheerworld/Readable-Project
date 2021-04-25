const api = "http://localhost:3001";
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return d.toLocaleDateString() + " | " + time.substr(0, 5) + time.slice(-2);
}

export function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const addNewPost = async (post) => {
  console.log(post);
  const response = await fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const newPosts = await response.json();
  console.log(newPosts);
  return newPosts;
};

export const getAllCategory = async () => {
  const response = await fetch(`${api}/categories`, {
    method: "GET",
    headers,
  });
  const categories = await response.json();
  console.log(response);
  return categories;
};

export const getAllPosts = async () => {
  const response = await fetch(`${api}/posts`, {
    method: "GET",
    headers,
  });
  const posts = await response.json();
  return posts;
};
