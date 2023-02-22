import axios from "axios";
import { ProductProps } from "../types/types";

export function getProducts() {
  return axios.get("http://localhost:3000/products").then((res) => res.data);
}

export function getProduct(id: string) {
  return axios
    .get(`http://localhost:3000/products/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
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

/* FIXME: Změnit type na správnou věc */
export const createProduct = (productData: any) => {
  return axios
    .post("http://localhost:3000/products", {
      ...productData,
      id: crypto.randomUUID(),
    })
    .then((res) => res.data);
};

export function updateProduct(productData: any) {
  return axios
    .put(`http://localhost:3000/products/${productData.id}`, productData)
    .then((res) => res.data);
}
