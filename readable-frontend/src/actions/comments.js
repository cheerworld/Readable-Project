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
  return (dispatch) => {
    return voteCommentToServer(id, comment)
      .then((data) => {
        dispatch(voteForComment(data));
        localStorage.setItem(id, comment.option);
        const value = localStorage.getItem(id);
        console.log(value);
      })
      .catch((e) => {
        console.warn("handleVoteComment: ", e);
      });
  };
}

export function handleEditComment(comment) {
  return (dispatch) => {
    return editCommentToServer(comment)
      .then((data) => {
        dispatch(editComment(data));
      })
      .catch((e) => {
        console.warn("handleEditComment: ", e);
      });
  };
}

export function handleDeleteComment(id) {
  return (dispatch) => {
    return deleteCommentToServer(id)
      .then((data) => {
        dispatch(deleteAComment(data.parentId, data.id));
      })
      .catch((e) => {
        console.warn("handleDeleteComment: ", e);
      });
  };
}

export function handleAddComment(comment) {
  return (dispatch) => {
    return addCommentToPostServer(comment)
      .then((data) => {
        dispatch(addAComment(data));
      })
      .catch((e) => {
        console.warn("handleAddComment: ", e);
      });
  };
}

export function handleGetComments(id) {
  return (dispatch) => {
    return getCommentsFromServer(id)
      .then((data) => {
        dispatch(getComments(id, data));
      })
      .catch((e) => {
        console.warn("handleGetComments: ", e);
      });
  };
}
