import { CatchingPokemon, Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { getProduct } from "../../data/products";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartItem = {
  id: string;
};

const CartItem = ({ id }: CartItem) => {
  const { removeCartItem } = useShoppingCart();

  const productQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });
  if (productQuery.status === "loading") return <h1>Loading...</h1>;
  if (productQuery.status === "error") return <h1>Not connected to API</h1>;

  return (
    <ListItem
      onClick={() => console.log("Ahoj")}
      sx={{
        cursor: "pointer",
        "&:hover": {
          background: "rgba(234, 234, 234, 0.41)",
        },
      }}
      secondaryAction={
        <IconButton onClick={() => removeCartItem(id)}>
          <Delete color="error" />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar
          variant="square"
          alt={productQuery.data.name}
          src={productQuery.data.imgUrl}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ maxWidth: "15rem" }}
        primary={productQuery.data.name}
        secondary={formatCurrency(productQuery.data.price)}
      />
    </ListItem>
  );
};

export default CartItem;
