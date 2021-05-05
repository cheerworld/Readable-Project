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
  try {
    const response = await fetch(`${api}/posts/${id}`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    const votedPost = await response.json();
    return votedPost;
  } catch (e) {
    console.warn("Error in votePostToServer server call: ", e);
  }
};

export const voteCommentToServer = async (id, option) => {
  try {
    const response = await fetch(`${api}/comments/${id}`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    const votedComment = await response.json();
    return votedComment;
  } catch (e) {
    console.warn("Error in voteCommentToServer server call: ", e);
  }
};

export const editCommentToServer = async (comment) => {
  try {
    const response = await fetch(`${api}/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const editedComment = await response.json();
    return editedComment;
  } catch (e) {
    console.warn("Error in editCommentToServer server call: ", e);
  }
};

export const deleteCommentToServer = async (id) => {
  try {
    const response = await fetch(`${api}/comments/${id}`, {
      method: "DELETE",
      headers,
    });
    const comment = await response.json();
    return comment;
  } catch (e) {
    console.warn("Error in deleteCommentToServer server call: ", e);
  }
};

export const addCommentToPostServer = async (comment) => {
  try {
    const response = await fetch(`${api}/comments`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const newComment = await response.json();
    return newComment;
  } catch (e) {
    console.warn("Error in addCommentToPostServer server call: ", e);
  }
};

export const getCommentsFromServer = async (id) => {
  try {
    const response = await fetch(`${api}/posts/${id}/comments`, {
      method: "GET",
      headers,
    });
    const comments = await response.json();
    return comments;
  } catch (e) {
    console.warn("Error in getCommentsFromServer server call: ", e);
  }
};

export const editPostToServer = async (post) => {
  try {
    const response = await fetch(`${api}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const editedPost = await response.json();
    return editedPost;
  } catch (e) {
    console.warn("Error in editPostToServer server call: ", e);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${api}/posts/${id}`, {
      method: "DELETE",
      headers,
    });
    const post = await response.json();
    return post;
  } catch (e) {
    console.warn("Error in deletePost server call: ", e);
  }
};

export const addPostToServer = async (post) => {
  try {
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
  } catch (e) {
    console.warn("Error in addPostToServer server call: ", e);
  }
};

export const getAllCategory = async () => {
  try {
    const response = await fetch(`${api}/categories`, {
      method: "GET",
      headers,
    });
    const categories = await response.json();
    return categories;
  } catch (e) {
    console.warn("Error in getAllCategory server call: ", e);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${api}/posts`, {
      method: "GET",
      headers,
    });
    const posts = await response.json();
    return posts;
  } catch (e) {
    console.warn("Error in getAllPosts server call: ", e);
  }
};

export const getInitialData = async () => {
  try {
    const data = await Promise.all([getAllCategory(), getAllPosts()]);
    const [categories, posts] = data;

    return {
      ...categories,
      posts,
    };
  } catch (e) {
    console.warn("Error in getInitialData server call: ", e);
  }
};
