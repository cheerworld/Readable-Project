import { GET_ALLPOSTS } from "../actions/posts";

export default function posts(state = [], action) {
  switch (action.type) {
    case GET_ALLPOSTS:
      return [...state, ...action.posts];
    default:
      return state;
  }
}
