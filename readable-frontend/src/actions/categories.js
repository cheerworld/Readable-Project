export const GET_ALLCATEGORIES = "GET_ALLCATEGORIES";

export function getCategories(categories) {
  return {
    type: GET_ALLCATEGORIES,
    categories,
  };
}
