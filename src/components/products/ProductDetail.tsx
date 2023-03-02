import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import { ShoppingCart } from "@mui/icons-material";
import axios from "axios";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useDeleteProductQuery, useProductQuery } from "../../data/queries";
import { formatCurrency } from "../../utilities/formatCurrency";
import ErrorComponent from "../Others/ErrorComponent";
import ShareMenu from "./ShareMenu";

const ProductDetail = () => {
  const { id } = useParams();
  const convertedId = String(id);
  const productQuery = useProductQuery(convertedId);
  const deleteProductMutation = useDeleteProductQuery(convertedId);
  const navigate = useNavigate();
  const { increaseCartQuantity } = useShoppingCart();

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(convertedId);
  };

  const ImgComponent = styled("div")();

  if (productQuery.status === "loading") return <div>Loading data...</div>;
  if (productQuery.error instanceof Error) {
    let errorStatus = null;
    if (axios.isAxiosError(productQuery.error)) {
      errorStatus = productQuery.error.response?.status;
    }
    return <ErrorComponent status={errorStatus ?? 500} />;
  }

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          padding: "1rem",
          fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem" },
        }}
      >
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          href={productQuery.data.type === "boosters" ? "/boosters" : "/Boxes"}
        >
          {productQuery.data.type === "boosters" ? "Boosters" : "Boxes"}
        </Link>
        <Link aria-current="page" sx={{ cursor: "not-allowed" }}>
          {productQuery.data.name}
        </Link>
      </Breadcrumbs>
      <Container>
        <Stack direction={{ xs: "column", sm: "row" }} sx={{ height: "100%" }}>
          <ImgComponent
            sx={{
              background: `url(/${productQuery.data.imgUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100%",
              width: "100%",
              minHeight: "70vh",
            }}
          />
          <Box
            sx={{
              flex: "0 0 40%",
              padding: 1,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ fontSize: "1.3rem" }}>
                {productQuery.data.name}
              </Typography>
              <ShareMenu />
            </Stack>
            <Typography sx={{ color: "#858585" }}>
              {productQuery.data.description}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              {productQuery.data.discount ? (
                <Stack
                  sx={{
                    color: "common.white",
                    textAlign: "center",
                    maxWidth: "10rem",
                  }}
                  direction="column"
                >
                  <Typography
                    sx={{
                      bgcolor: "#fee956",
                      color: "common.black",
                      p: ".5rem",
                      fontSize: ".8rem",
                      fontWeight: "600",
                      borderTopRightRadius: ".5rem",
                      borderTopLeftRadius: ".5rem",
                    }}
                  >
                    Discounted -{productQuery.data.discount}%
                  </Typography>
                  <Box
                    sx={{
                      padding: ".2rem",
                      bgcolor: "common.pokemonRed",
                      borderBottomRightRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
                      {formatCurrency(
                        (productQuery.data.price *
                          (100 - productQuery.data.discount)) /
                          100
                      )}
                    </Typography>
                    <Typography
                      sx={{ textDecoration: "line-through", fontSize: ".8rem" }}
                    >
                      {formatCurrency(productQuery.data.price)}
                    </Typography>
                  </Box>
                </Stack>
              ) : (
                <Typography sx={{ fontSize: "1.7rem" }}>
                  {formatCurrency(productQuery.data.price)}
                </Typography>
              )}
              <Button
                sx={{
                  color: "common.pokemonRed",
                  border: "1px solid red",
                  p: ".5rem",
                  "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px",
                  },
                }}
                startIcon={<ShoppingCart />}
                onClick={() => {
                  increaseCartQuantity(String(id));
                }}
              >
                Add to Cart
              </Button>
            </Stack>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </Box>
        </Stack>

        <Divider />
      </Container>
    </>
  );
};

export default ProductDetail;
