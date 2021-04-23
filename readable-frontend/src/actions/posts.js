import { getAllPosts } from "../utils/api";
export const GET_ALLPOSTS = "GET_ALLPOSTS";

export function getPosts(posts) {
  return {
    type: GET_ALLPOSTS,
    posts,
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
