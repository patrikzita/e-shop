import axios from "axios";
import { Values } from "../components/products/ProductForm";
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

export const createProduct = async (productData: Values) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/products",
      productData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
