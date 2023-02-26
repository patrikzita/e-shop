import { Avatar, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProduct } from "../../data/products";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartOrderItemProps = {
  id: string;
};

const CartOrderItem = ({ id }: CartOrderItemProps) => {
  const productQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });
  if (productQuery.status === "loading") return <h1>Loading...</h1>;
  if (productQuery.status === "error") return <h1>Not connected to API</h1>;
  return (
    <Stack sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-around">
        <Avatar
          src={`/${productQuery.data.imgUrl}`}
          sx={{ height: 100, width: 100 }}
        />
        <Link to={`/products/${id}`}>
          <Typography
            sx={{
              cursor: "pointer",
              minWidth: "40ch",
              textAlign: "center",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {productQuery.data.name}
          </Typography>
        </Link>
        <Typography sx={{ color: "success.main" }}>
          {productQuery.data.discount
            ? formatCurrency(
                (productQuery.data.price * (100 - productQuery.data.discount)) /
                  100
              )
            : formatCurrency(productQuery.data.price)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CartOrderItem;
