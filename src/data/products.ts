import axios from "axios";
import { ProductProps } from "../types/types";

export function getProducts() {
  return axios.get("http://localhost:3000/products").then((res) => res.data);
}

export function getProduct(id: string) {
  return axios
    .get(`http://localhost:3000/products/${id}`)
    .then((res) => res.data);
}
export function getSpecificProduct(sort: string) {
  return axios
    .get("http://localhost:3000/products")
    .then((res) => res.data)
    .then((products) => {
      if (sort === "box") {
        return products.filter(
          (product: ProductProps) => product.type === "box"
        );
      } else if (sort === "booster") {
        return products.filter(
          (product: ProductProps) => product.type === "booster"
        );
      } else if (sort === "promotion") {
        return products.filter((product: ProductProps) => product.promotion);
      } else {
        return products;
      }
    });
}
