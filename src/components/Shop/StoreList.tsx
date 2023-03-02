import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import StoreItem from "./StoreItem";
import { useQuery } from "@tanstack/react-query";
import { getSpecificProduct } from "../../data/products";
import { ProductProps } from "../../types/types";
import { useNavigate } from "react-router-dom";

type StoreListProps = {
  title: string;
  sortItem: string;
};

const StoreList = ({ title, sortItem }: StoreListProps) => {
  const navigate = useNavigate();
  const productsQuery = useQuery({
    queryKey: ["products", sortItem],
    queryFn: () => getSpecificProduct(sortItem),
  });

  if (productsQuery.status === "loading") {
    return (
      <Grid container rowSpacing={8} columnSpacing={2}>
        {[...Array(3)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
            <LoadingProduct />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (productsQuery.status === "error") return <h1>Not connected to API</h1>;
  return (
    <>
      <Container sx={{ p: 4 }}>
        <Stack direction="row" justifyContent="space-between" m={3}>
          <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
            {title}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/products/new")}
          >
            Create New
          </Button>
        </Stack>
        <Grid container rowSpacing={8}>
          {productsQuery.data.map((product: ProductProps) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
              <StoreItem
                id={product.id} //TODO: Opravit
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

function LoadingProduct() {
  return (
    <Card
      sx={{
        height: "100%",
        margin: "0 auto",
      }}
    >
      <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "1rem",
          height: "280px",
        }}
      >
        <Skeleton animation="wave" height={50} width="80%" />
        <Skeleton animation="wave" height={50} width="40%" />
        <Skeleton animation="wave" height={60} width="40%" />
      </CardContent>
    </Card>
  );
}
