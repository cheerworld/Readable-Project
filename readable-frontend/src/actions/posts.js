import { getAllPosts, addPostToServer } from "../utils/api";
export const GET_ALLPOSTS = "GET_ALLPOSTS";
export const ADD_NEWPOST = "ADD_NEWPOST";

export function getPosts(posts) {
  return {
    type: GET_ALLPOSTS,
    posts,
  };
}

export function addNewPost(post) {
  return {
    type: ADD_NEWPOST,
    post,
  };
}

export function handleAddPost(post) {
  return (dispatch) => {
    return addPostToServer(post)
      .then((data) => {
        dispatch(addNewPost(data));
      })
      .catch((e) => {
        console.warn("Error in handleAddPost: ", e);
      });
  };
}

export function handleGetPosts() {
  return (dispatch) => {
    return getAllPosts()
      .then((data) => {
        dispatch(getPosts(data));
      })
      .catch((e) => {
        console.warn("Error in handleGetPosts: ", e);
      });
  };
}
