import {
  getCommentsFromServer,
  addCommentToPostServer,
  deleteCommentToServer,
} from "../utils/api";
export const GET_ALLCOMMENTS = "GET_ALLCOMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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
