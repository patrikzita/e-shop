import { ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";

/* TODO: Použít SnackBar pro hlášku, že byl přidán Item do Cart */

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  discount?: number;
};

const StoreItem = ({ id, name, price, imgUrl, discount }: StoreItemProps) => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <Card
      sx={{
        maxWidth: { xs: "300px", sm: "350px", md: "350px" },
        height: "100%",
        cursor: "pointer",
        margin: "0 auto",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        },
      }}
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
          onClick={() => increaseCartQuantity(id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoreItem;
