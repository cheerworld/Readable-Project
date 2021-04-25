import { GET_ALLPOSTS, ADD_NEWPOST } from "../actions/posts";

export default function posts(state = [], action) {
  switch (action.type) {
    case GET_ALLPOSTS:
      return [...state, ...action.posts];
    case ADD_NEWPOST:
      return [...state, { ...action.post }];
    default:
      return state;
  }
}
