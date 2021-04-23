import { getAllCategory } from "../utils/api";
export const GET_ALLCATEGORIES = "GET_ALLCATEGORIES";

export function getCategories(categories) {
  return {
    type: GET_ALLCATEGORIES,
    categories,
  };
}

export function handleGetCategories() {
  return (dispatch) => {
    return getAllCategory()
      .then(data => {
        const newData = data.categories;
        dispatch(getCategories(newData))
      })
      .catch((e) => {
        console.warn("Error in handleGetCategories: ", e);
      })
  }
}
