import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartOrderItem from "./CartOrderItem";

const CartOrder = () => {
  const { cartItems } = useShoppingCart();

  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return cartItems.length === 0 ? (
    <h1>Looks like there is nothing</h1>
  ) : (
    <Container>
      <Divider sx={{ borderBottomWidth: ".5rem", borderColor: "#ee3030" }} />
      <Stack direction="column" sx={{ backgroundColor: "primary.main" }}>
        {cartItems.map((cartProduct) => (
          <CartOrderItem key={cartProduct.id} id={cartProduct.id} />
        ))}
        <Box>
          <Typography>Total Amount: {}</Typography>
        </Box>
        <Stack direction="row" justifyContent="space-between" p={4}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => handleNavigate(`/boosters`)}
          >
            Continue Shopping
          </Button>
          <Stack direction="row" gap={3}>
            <Button color="info" variant="contained">
              Finish order
            </Button>
            <Button
              color="success"
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => handleNavigate(`/cart/payment`)}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CartOrder;
