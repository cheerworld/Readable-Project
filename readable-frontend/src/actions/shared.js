import { getCategories } from "./categories";
import { getPosts } from "./posts";
import { getInitialData } from "../utils/api";

export function handleInitialData() {
  return async (dispatch) => {
    try {
      const { categories, posts } = await getInitialData();
      dispatch(getCategories(categories));
      dispatch(getPosts(posts));
      return { categories, posts };
    } catch (e) {
      console.warn("handleInitialData: ", e);
    }
  };
}
