import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../data/products";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();

  const productQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(String(id)),
  });

  if (productQuery.status === "loading") return <h1>Loading...</h1>;
  if (productQuery.status === "error") return <h1>Chyba</h1>;

  return (
    <>
      <ProductForm {...productQuery.data} id={id} />
    </>
  );
};

export default EditProduct;
