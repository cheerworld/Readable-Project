import {
  GET_ALLCOMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/comments";

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_ALLCOMMENTS:
      return {
        ...state,
        [action.id]: [...action.comments],
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: [
          ...state[action.comment.parentId],
          action.comment,
        ],
      };
    case DELETE_COMMENT:
      const newComment = state[action.parentId].filter((comment) => {
        return comment.id !== action.id;
      });
      return {
        ...state,
        [action.parentId]: newComment,
      };
    default:
      return state;
  }
}
