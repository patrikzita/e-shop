import { useState } from "react";

import { Check, ShoppingCart } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  discount?: number;
};

const StoreItem = ({ id, name, price, imgUrl, discount }: StoreItemProps) => {
  const [isOpenSnack, setIsOpenSnack] = useState<Readonly<boolean>>(false);
  const { increaseCartQuantity, cartItems } = useShoppingCart();
  const isProductAdded = cartItems.some((item) => item.id === id);
  const navigate = useNavigate();

  function handleClickOnCard() {
    navigate(`/products/${id}`);
  }

  const handleClose = (
    event: React.SyntheticEvent | Event, // Neccesary for MUI
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenSnack(false);
  };

  const SnackBarAlert = (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={1500}
      open={isOpenSnack}
      onClose={handleClose}
      sx={{
        "&.MuiSnackbar-root": {
          top: "100px",
        },
      }}
    >
      <Alert
        sx={{ minWidth: "200px", fontSize: "1.3rem" }}
        severity="success"
        onClose={handleClose}
        icon={<Check />}
      >
        Added to Cart
      </Alert>
    </Snackbar>
  );

  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: "300px", sm: "350px", md: "300px" },
          height: "100%",
          cursor: "pointer",
          margin: "0 auto",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          },
        }}
        onClick={handleClickOnCard}
      >
        <CardMedia component="img" image={imgUrl} />
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
          <Typography
            sx={{
              color: "common.blue",
              minHeight: "3rem",
              fontWeight: "700",
              "&:hover": {
                color: "#90caf9",
              },
            }}
          >
            {name}
          </Typography>
          {discount ? (
            <Stack
              sx={{
                color: "common.white",
                textAlign: "center",
              }}
              direction="column"
              alignItems="space-between"
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
                Discounted -{discount}%
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
                  {formatCurrency((price * (100 - discount)) / 100)}
                </Typography>
                <Typography
                  sx={{ textDecoration: "line-through", fontSize: ".8rem" }}
                >
                  {formatCurrency(price)}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "1.7rem" }}>
              {formatCurrency(price)}
            </Typography>
          )}

          {isProductAdded ? (
            <Box>
              <Typography sx={{ color: "success.main", fontWeight: "700" }}>
                Added to Cart
              </Typography>
            </Box>
          ) : (
            <Button
              sx={{
                color: "common.black",
                border: "1px solid gray",
                p: ".5rem",
                "&:hover": {
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 5px",
                },
              }}
              startIcon={<ShoppingCart />}
              onClick={(e) => {
                e.stopPropagation();
                increaseCartQuantity(id);
                setIsOpenSnack(true);
              }}
            >
              Add to Cart
            </Button>
          )}
        </CardContent>
      </Card>
      {SnackBarAlert}
    </>
  );
};

export default StoreItem;
