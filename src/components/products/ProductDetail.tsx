import { Facebook, Share, ShoppingCart, Twitter } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { getProduct } from "../../data/products";
import { formatCurrency } from "../../utilities/formatCurrency";

const ProductDetail = () => {
  const { id } = useParams();
  const idAsString: string = String(id);
  const productQuery = useQuery({
    queryKey: ["products", idAsString],
    queryFn: () => getProduct(idAsString),
  });
  const { increaseCartQuantity } = useShoppingCart();
  const [anchorShareMenu, setAnchorShareMenu] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorShareMenu);

  const handleClickShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorShareMenu(event.currentTarget);
  };
  const handleCloseShareMenu = () => {
    setAnchorShareMenu(null);
  };

  const ImgComponent = styled("div")(({ theme }) => ({
    background: `url(/${productQuery.data.imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100%",
    width: "100%",
    height: "100%",
    minHeight: "60vh",
  }));

  if (productQuery.status === "loading") return <div>Loading data...</div>;
  if (productQuery.status === "error") return <div>Data nebyla nalezena</div>;

  const ShareMenu = (
    <Menu
      id="share-menu"
      open={open}
      anchorEl={anchorShareMenu}
      onClose={handleCloseShareMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Stack direction="column">
        <MenuItem onClick={handleCloseShareMenu}>
          <Twitter sx={{ color: "common.blue" }} />
        </MenuItem>
        <MenuItem onClick={handleCloseShareMenu}>
          <Facebook sx={{ color: "common.blue" }} />
        </MenuItem>
      </Stack>
    </Menu>
  );

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
      <Container sx={{ mt: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} sx={{ height: "100%" }}>
          <ImgComponent />
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
              <IconButton onClick={(e) => handleClickShareMenu(e)}>
                <Share />
              </IconButton>
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
          </Box>
        </Stack>
        <Divider />
      </Container>
      {ShareMenu}
    </>
  );
};

export default ProductDetail;
