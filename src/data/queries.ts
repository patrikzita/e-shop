import { useQuery } from "@tanstack/react-query";
import { getProductDataFetch, getProductsDataFetch } from "./products";

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDataFetch(id),
  });
};

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsDataFetch,
  });
}
