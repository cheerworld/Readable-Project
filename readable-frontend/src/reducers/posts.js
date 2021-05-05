import {
  GET_ALLPOSTS,
  ADD_NEWPOST,
  DELETE_POST,
  EDIT_POST,
  VOTE_POST,
  SORT_POST_BY_VOTE_FROM_HIGH,
  SORT_POST_BY_VOTE_FROM_LOW,
  SORT_POST_BY_DATE_LATEST,
  SORT_POST_BY_DATE_OLDEST,
  ADD_COMMENTCOUNT_POST,
  DEDUCT_COMMENTCOUNT_POST,
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
      const newVote = action.post.voteScore;
      const votedPost = [...state];
      votedPost.forEach((post) => {
        if (post.id === action.post.id) {
          post.voteScore = newVote;
          return post;
        }
      });
      return votedPost;
    case ADD_COMMENTCOUNT_POST:
      const newPostState = state.filter((post) => post.id === action.id)[0];
      const restPost = state.filter((post) => post.id !== action.id);
      return [
        ...restPost,
        {
          ...newPostState,
          commentCount: newPostState.commentCount + 1,
        },
      ];
    case DEDUCT_COMMENTCOUNT_POST:
      const filteredPost = state.filter((post) => post.id === action.id)[0];
      const otherPosts = state.filter((post) => post.id !== action.id);
      return [
        ...otherPosts,
        {
          ...filteredPost,
          commentCount: filteredPost.commentCount - 1,
        },
      ];
    case SORT_POST_BY_VOTE_FROM_HIGH:
      const copyState = [...state];
      const sortVoteHigh = copyState.sort((a, b) => b.voteScore - a.voteScore);
      return sortVoteHigh;
    case SORT_POST_BY_VOTE_FROM_LOW:
      const copyForSort = [...state];
      const sortVoteLow = copyForSort.sort((a, b) => a.voteScore - b.voteScore);
      return sortVoteLow;
    case SORT_POST_BY_DATE_LATEST:
      const copyForState = [...state];
      const sortDateLatest = copyForState.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      return sortDateLatest;
    case SORT_POST_BY_DATE_OLDEST:
      const copyAState = [...state];
      const sortDateOldest = copyAState.sort(
        (a, b) => a.timestamp - b.timestamp
      );
      return sortDateOldest;
    default:
      return state;
  }
}
