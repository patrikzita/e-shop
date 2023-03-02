import { useParams } from "react-router-dom";
import { useProductQuery } from "../../data/queries";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();

  const productQuery = useProductQuery(String(id));

  if (productQuery.status === "loading") return <h1>Loading...</h1>;
  if (productQuery.status === "error") return <h1>Chyba</h1>;

  return (
    <>
      <ProductForm {...productQuery.data} id={id} />
    </>
  );
};

export default EditProduct;
