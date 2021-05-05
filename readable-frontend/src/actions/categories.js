import { getAllCategory } from "../utils/api";
export const GET_ALLCATEGORIES = "GET_ALLCATEGORIES";

export function getCategories(categories) {
  return {
    type: GET_ALLCATEGORIES,
    categories,
  };
}

export function handleGetCategories() {
  return async (dispatch) => {
    try {
      const allCategory = await getAllCategory();
      dispatch(getCategories(allCategory.categories));
    } catch (e) {
      console.warn("Error in handleGetCategories: ", e);
    }
  };
}
