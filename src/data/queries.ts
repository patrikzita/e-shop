import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import {
  deleteProduct,
  getProductDataFetch,
  getProductsDataFetch,
} from "./products";

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDataFetch(id),
  });
}

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsDataFetch,
  });
}

export function useDeleteProductQuery(id: string) {
  const { cartItems, removeCartItem } = useShoppingCart();
  const queryClient = useQueryClient() as QueryClient;
  const navigate = useNavigate();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      if (cartItems) {
        const productInCart = cartItems.find((item) => item.id === id);
        if (productInCart) {
          removeCartItem(id);
        }
      }
      queryClient.invalidateQueries(["products"]);
      navigate("/");
    },
  });
}
