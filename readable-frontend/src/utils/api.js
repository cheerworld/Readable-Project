const api = "http://localhost:3001";
let token = localStorage.token
if (!token)
 token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategory = async () => {

  const response = await fetch(`${api}/categories`, {
    method: "GET",
    headers });
  const categories = await response.json();
  console.log(response)
  return categories;
}

export const getAllPosts = async () => {

  const response = await fetch(`${api}/posts`, {
    method: "GET",
    headers });
  const posts = await response.json();
  return posts;
}
