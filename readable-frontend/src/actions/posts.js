import {
  getAllPosts,
  addPostToServer,
  deletePost,
  editPostToServer,
  votePostToServer,
} from "../utils/api";
export const GET_ALLPOSTS = "GET_ALLPOSTS";
export const ADD_NEWPOST = "ADD_NEWPOST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const VOTE_POST = "VOTE_POST";

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

export function deleteAPost(postId) {
  return {
    type: DELETE_POST,
    postId,
  };
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  };
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  };
}

export function handleVotePost(id, post) {
  return (dispatch) => {
    return votePostToServer(id, post)
      .then((data) => {
        dispatch(votePost(data));
      })
      .catch((e) => {
        console.warn("Error in handleVotePost: ", e);
      });
  };
}

export function handleEditPost(post) {
  return (dispatch) => {
    return editPostToServer(post)
      .then((data) => {
        dispatch(editPost(data));
      })
      .catch((e) => {
        console.warn("Error in handleEditPost: ", e);
      });
  };
}

export function handleDeletePost(postId) {
  return (dispatch) => {
    return deletePost(postId)
      .then((data) => {
        dispatch(deleteAPost(postId));
      })
      .catch((e) => {
        console.warn("Error in handleAddPost: ", e);
      });
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
