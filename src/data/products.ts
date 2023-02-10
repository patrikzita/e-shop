import axios from "axios";

export function getProducts() {
  return axios.get("http://localhost:3000/products").then((res) => res.data);
}

export function getProduct(id: string) {
  return axios
    .get(`http://localhost:3000/products/${id}`)
    .then((res) => res.data);
}
