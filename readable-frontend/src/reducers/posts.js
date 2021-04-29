import {
  GET_ALLPOSTS,
  ADD_NEWPOST,
  DELETE_POST,
  EDIT_POST,
  VOTE_POST,
} from "../actions/posts";

export default function posts(state = [], action) {
  switch (action.type) {
    case GET_ALLPOSTS:
      return [...state, ...action.posts];
    case ADD_NEWPOST:
      return [...state, { ...action.post }];
    case DELETE_POST:
      const newState = state.filter((data) => data.id !== action.postId);
      return newState;
    case EDIT_POST:
      const editState = state
        .filter((data) => data.id !== action.post.id)
        .concat([action.post]);
      return editState;
    case VOTE_POST:
      const votedPost = state
        .filter((data) => data.id !== action.post.id)
        .concat([action.post]);
      return votedPost;
    default:
      return state;
  }
}
