import { GET_ALLCOMMENTS, ADD_COMMENT } from "../actions/comments";

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
    default:
      return state;
  }
}
