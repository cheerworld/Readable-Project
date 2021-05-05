import {
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
export const SORT_POST_BY_VOTE_FROM_HIGH = "SORT_POST_BY_VOTE_FROM_HIGH";
export const SORT_POST_BY_VOTE_FROM_LOW = "SORT_POST_BY_VOTE_FROM_LOW";
export const SORT_POST_BY_DATE_LATEST = "SORT_POST_BY_DATE_LATEST";
export const SORT_POST_BY_DATE_OLDEST = "SORT_POST_BY_DATE_OLDEST";
export const ADD_COMMENTCOUNT_POST = "ADD_COMMENTCOUNT_POST";
export const DEDUCT_COMMENTCOUNT_POST = "DEDUCT_COMMENTCOUNT_POST";

export function sortByDateOldest() {
  return {
    type: SORT_POST_BY_DATE_OLDEST,
  };
}

export function sortByDateLatest() {
  return {
    type: SORT_POST_BY_DATE_LATEST,
  };
}

export function sortByVoteLow() {
  return {
    type: SORT_POST_BY_VOTE_FROM_LOW,
  };
}

export function sortByVoteHigh() {
  return {
    type: SORT_POST_BY_VOTE_FROM_HIGH,
  };
}

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

export function addToCommentCount(id) {
  return {
    type: ADD_COMMENTCOUNT_POST,
    id,
  };
}

export function deductToCommentCount(id) {
  return {
    type: DEDUCT_COMMENTCOUNT_POST,
    id,
  };
}

export function handleVotePost(id, post) {
  return async (dispatch) => {
    try {
      await localStorage.setItem(id, post.option);

      const votedPost = await votePostToServer(id, post);
      dispatch(votePost(votedPost));
      return votedPost;
    } catch (e) {
      console.warn("Error in handleVotePost: ", e);
    }
  };
}

export function handleEditPost(post) {
  return async (dispatch) => {
    try {
      const editedPostServer = await editPostToServer(post);
      dispatch(editPost(editedPostServer));
      return editedPostServer;
    } catch (e) {
      console.warn("Error in handleEditPost: ", e);
    }
  };
}

export function handleDeletePost(postId) {
  return async (dispatch) => {
    try {
      const deletedPost = await deletePost(postId);
      dispatch(deleteAPost(postId));
      return deletedPost;
    } catch (e) {
      console.warn("Error in handleAddPost: ", e);
    }
  };
}

export function handleAddPost(post) {
  return async (dispatch) => {
    try {
      const addedPost = await addPostToServer(post);
      dispatch(addNewPost(addedPost));
      return addedPost;
    } catch (e) {
      console.warn("Error in handleAddPost: ", e);
    }
  };
}
