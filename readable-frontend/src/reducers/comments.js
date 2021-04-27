import { GET_ALLCOMMENTS } from "../actions/comments";

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_ALLCOMMENTS:
      return {
        ...state,
        [action.id]: [...action.comments],
      };
    default:
      return state;
  }
}
