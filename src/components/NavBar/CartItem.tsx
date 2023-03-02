import { Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useProductQuery } from "../../data/queries";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartItem = {
  id: string;
};

const CartItem = ({ id }: CartItem) => {
  const { removeCartItem } = useShoppingCart();
  const navigate = useNavigate();

  const productQuery = useProductQuery(id);
  if (productQuery.status === "loading") return <h1>Loading...</h1>;
  if (productQuery.status === "error") return <h1>Not connected to API</h1>;
  return (
    <ListItem
      onClick={() => navigate(`/products/${id}`)}
      sx={{
        cursor: "pointer",
        "&:hover": {
          background: "rgba(234, 234, 234, 0.41)",
        },
      }}
      secondaryAction={
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            removeCartItem(id);
          }}
        >
          <Delete color="error" />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar
          variant="square"
          alt={productQuery.data.name}
          src={`/${productQuery.data.imgUrl}`}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ maxWidth: "15rem" }}
        primary={productQuery.data.name}
        secondary={
          productQuery.data.discount
            ? formatCurrency(
                (productQuery.data.price * (100 - productQuery.data.discount)) /
                  100
              )
            : formatCurrency(productQuery.data.price)
        }
      />
    </ListItem>
  );
};

export default CartItem;
