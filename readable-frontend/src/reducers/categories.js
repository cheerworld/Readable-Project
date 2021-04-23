import { GET_ALLCATEGORIES } from "../actions/categories";

export default function categories(state=[],action) {
  switch (action.type) {
    case GET_ALLCATEGORIES:
      return [
        ...state,
        ...action.categories,
      ];
    default:
      return state;
  }
}
