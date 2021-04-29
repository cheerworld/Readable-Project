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

export const votePostToServer = async (id, option) => {
  const response = await fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const votedPost = await response.json();
  console.log(votedPost);
  return votedPost;
};

export const voteCommentToServer = async (id, option) => {
  const response = await fetch(`${api}/comments/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const votedComment = await response.json();
  console.log(votedComment);
  return votedComment;
};

export const editCommentToServer = async (comment) => {
  const response = await fetch(`${api}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const editedComment = await response.json();
  console.log(editedComment);
  return editedComment;
};

export const deleteCommentToServer = async (id) => {
  const response = await fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers,
  });
  const comment = await response.json();
  console.log(comment);
  return comment;
};

export const addCommentToPostServer = async (comment) => {
  const response = await fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const newComment = await response.json();
  console.log(newComment);
  return newComment;
};

export const getCommentsFromServer = async (id) => {
  const response = await fetch(`${api}/posts/${id}/comments`, {
    method: "GET",
    headers,
  });
  const comments = await response.json();
  console.log(comments);
  return comments;
};

export const editPostToServer = async (post) => {
  const response = await fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const editedPost = await response.json();
  //console.log(editedPost);
  return editedPost;
};

export const deletePost = async (id) => {
  const response = await fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers,
  });
  const post = await response.json();
  return post;
};

export const addPostToServer = async (post) => {
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
  return newPosts;
};

export const getAllCategory = async () => {
  const response = await fetch(`${api}/categories`, {
    method: "GET",
    headers,
  });
  const categories = await response.json();
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
