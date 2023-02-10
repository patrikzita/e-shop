import { Container, Grid, Typography } from "@mui/material";
import StoreItem from "./StoreItem";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../data/products";
import { ProductProps } from "../../types/types";

const StoreList = () => {
  /* TODO: Udělat takový to načítání které je běžné.. Loading itemů, informací */
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (productsQuery.status === "loading") return <h1>Loading...</h1>;
  if (productsQuery.status === "error") return <h1>Not connected to API</h1>;
  return (
    <>
      <Container sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: "4rem", textTransform: "capitalize" }}
        >
          All products
        </Typography>
        <Grid container rowSpacing={8}>
          {productsQuery.data.map((product: ProductProps) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
              <StoreItem
                id={product.id}
                name={product.name}
                price={product.price}
                imgUrl={product.imgUrl}
                discount={product?.discount}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default StoreList;
