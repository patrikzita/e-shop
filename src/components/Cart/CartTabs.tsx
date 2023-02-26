import { Stack, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const CartTabs = () => {
  const [alignment, setAlignment] = useState<string | null>("cart");
  const navigate = useNavigate();
  const location = useLocation();
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (location.pathname === "/cart/payment") {
      setAlignment("payment Delivery");
    } else if (location.pathname === "/cart/address") {
      setAlignment("address");
    } else if (location.pathname === "/cart/summary") {
      setAlignment("summary");
    } else {
      setAlignment("cart");
    }
  }, [location]);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ background: "common.white", mt: 4 }}
    >
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        sx={{
          "&.MuiButtonBase-root-MuiToggleButton-root": {
            border: "0",
          },
        }}
      >
        <ButtonTab value="cart" onClick={() => navigate("/cart")}>
          Cart
        </ButtonTab>
        <ButtonTab
          value="payment Delivery"
          onClick={() => navigate("/cart/payment")}
        >
          Payment Delivery
        </ButtonTab>
        <ButtonTab value="address" onClick={() => navigate("/cart/address")}>
          Address
        </ButtonTab>
        <ButtonTab value="summary" onClick={() => navigate("/cart/summary")}>
          Summary
        </ButtonTab>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default CartTabs;

const ButtonTab = styled(ToggleButton)(({ theme }) => ({
  fontSize: "1.4rem",
  color: [theme.palette.common.white],
  background: [theme.palette.primary.main],
  "&:hover": {
    background: "#fb4545",
  },
  "&.Mui-selected:hover": {
    background: "#fb4545",
  },
  "&.Mui-selected": {
    background: "#ee3030",
    color: theme.palette.common.white,
  },
}));
