import { getCommentsFromServer } from "../utils/api";
export const GET_ALLCOMMENTS = "GET_ALLCOMMENTS";

export function getComments(id, comments) {
  return {
    type: GET_ALLCOMMENTS,
    id,
    comments,
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
