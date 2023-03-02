import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useProductsQuery } from "../../data/queries";
import { ProductProps } from "../../types/types";
import { formatCurrency } from "../../utilities/formatCurrency";
import CartOrderItem from "./CartOrderItem";

const CartOrder = () => {
  const { cartItems } = useShoppingCart();

  const handleNavigate = (url: string) => {
    const navigate = useNavigate();
    navigate(url);
  };
  const { data } = useProductsQuery();

  const filteredData = data?.filter((item: any) =>
    cartItems.some((cartProduct) => cartProduct.id === item.id)
  );

  const totalAmount = filteredData?.reduce(
    (acc: number, product: ProductProps) => {
      let price = product.price;
      if (product?.discount) {
        price = (product.price * (100 - product.discount)) / 100;
      }
      return acc + price;
    },
    0
  );

  return cartItems.length === 0 ? (
    /* TODO: Dodělat sekci, prázdný Shopping Cart */
    <h1>Looks like there is nothing</h1>
  ) : (
    <Container>
      <Divider sx={{ borderBottomWidth: ".5rem", borderColor: "#ee3030" }} />
      <Stack direction="column" sx={{ backgroundColor: "primary.main" }}>
        {cartItems.map((cartProduct) => (
          <CartOrderItem key={cartProduct.id} id={cartProduct.id} />
        ))}
        <Stack direction="row" gap={2} justifyContent={"flex-end"}>
          <Typography sx={{ fontWeight: 600 }}>Total Amount:</Typography>
          <Typography sx={{ color: "success.main" }}>
            {formatCurrency(totalAmount)}
          </Typography>
        </Stack>
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
