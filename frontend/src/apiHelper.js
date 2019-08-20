const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://arbol-express.herokuapp.com/api/v1"
    : "http://localhost:5000/api/v1";

export default function fetchApi(route, options) {
  return fetch(API_URL + route, { ...options, credentials: "include" });
}
