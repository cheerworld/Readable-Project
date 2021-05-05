import {
  getCommentsFromServer,
  addCommentToPostServer,
  deleteCommentToServer,
  editCommentToServer,
  voteCommentToServer,
} from "../utils/api";
export const GET_ALLCOMMENTS = "GET_ALLCOMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export function deleteAComment(parentId, id) {
  return {
    type: DELETE_COMMENT,
    parentId,
    id,
  };
}

export function addAComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function getComments(id, comments) {
  return {
    type: GET_ALLCOMMENTS,
    id,
    comments,
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}

export function voteForComment(comment) {
  return {
    type: VOTE_COMMENT,
    comment,
  };
}

export function handleVoteComment(id, comment) {
  return async (dispatch) => {
    try {
      await localStorage.setItem(id, comment.option);

      const votedComment = await voteCommentToServer(id, comment);
      dispatch(voteForComment(votedComment));
      return votedComment;
    } catch (e) {
      console.warn("handleVoteComment: ", e);
    }
  };
}

export function handleEditComment(comment) {
  return async (dispatch) => {
    try {
      const editedComment = await editCommentToServer(comment);
      dispatch(editComment(editedComment));
      return editedComment;
    } catch (e) {
      console.warn("handleEditComment: ", e);
    }
  };
}

export function handleDeleteComment(id) {
  return async (dispatch) => {
    try {
      const deletedComment = await deleteCommentToServer(id);
      dispatch(deleteAComment(deletedComment.parentId, deletedComment.id));
      return deletedComment;
    } catch (e) {
      console.warn("handleDeleteComment: ", e);
    }
  };
}

export function handleAddComment(comment) {
  return async (dispatch) => {
    try {
      const addedComment = await addCommentToPostServer(comment);
      dispatch(addAComment(addedComment));
      return addedComment;
    } catch (e) {
      console.warn("handleAddComment: ", e);
    }
  };
}

export function handleGetComments(id) {
  return async (dispatch) => {
    try {
      const comments = await getCommentsFromServer(id);
      dispatch(getComments(id, comments));
      return comments;
    } catch (e) {
      console.warn("handleGetComments: ", e);
    }
  };
}
