import { Stack, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAligment from "../../hooks/useAligment";

const CartTabs = () => {
  const [alignment, setAlignment] = useAligment();
  const navigate = useNavigate();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>, // For typescript, onChange value needs this.
    newAlignment: string
  ): void => {
    setAlignment(newAlignment);
  };

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
            border: "none",
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
