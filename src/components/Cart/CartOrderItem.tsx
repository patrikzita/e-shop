import { Stack, styled, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useProductQuery } from "../../data/queries";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartOrderItemProps = {
  id: string;
};

const CartOrderItem = ({ id }: CartOrderItemProps) => {
  const productQuery = useProductQuery(id);

  if (productQuery.status === "loading") return <h1>Loading...</h1>;
  if (productQuery.status === "error" || !productQuery.data)
    return <h1>Not connected to API</h1>;

  const formattedPrice = productQuery.data.discount
    ? formatCurrency(
        (productQuery.data.price * (100 - productQuery.data.discount)) / 100
      )
    : formatCurrency(productQuery.data.price);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-around"}
      >
        <ItemIcon src={`/${productQuery.data.imgUrl}`} />
        <Link to={`/products/${id}`}>
          <Typography
            sx={{
              cursor: "pointer",
              minWidth: "45ch",
              textAlign: "center",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {productQuery.data.name}
          </Typography>
        </Link>
        <Typography sx={{ color: "success.main" }}>{formattedPrice}</Typography>
      </Stack>
    </Stack>
  );
};

export default CartOrderItem;

const ItemIcon = styled("img")({
  height: 100,
  width: 100,
  objectFit: "cover",
});
