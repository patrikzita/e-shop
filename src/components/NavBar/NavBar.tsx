import { useState } from "react";
import {
  AppBar,
  styled,
  Toolbar,
  Box,
  MenuItem,
  IconButton,
  Badge,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography,
  Tooltip,
  Popover,
  Stack,
  Button,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  CatchingPokemon,
  Clear,
  Delete,
  Menu as MenuButton,
  ShoppingCart,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  {
    title: "Cards",
    url: "/Cards",
  },
  {
    title: "Boxes",
    url: "/Boxes",
  },
];

export function NavBar() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openMobileCartMenu, setOpenMobileCartMenu] = useState<boolean>(false);
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
  const handleOpenShoppingCart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleCloseShoppingCart = () => {
    setAnchorElCart(null);
  };

  const navigate = useNavigate();
  const mobileMenu = (
    <Drawer
      open={openCart}
      anchor="top"
      onClose={() => setOpenCart(false)}
      sx={{
        "& .MuiPaper-root": {
          top: 55,
        },
        display: {
          xs: "block",
          sm: "none",
        },
      }}
    >
      <Box>
        <List>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.title}>
              <ListItemButton
                onClick={() => {
                  navigate(item.url);
                  setOpenCart(false);
                }}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
  const mobileCartMenu = (
    <Drawer
      open={openMobileCartMenu}
      anchor="top"
      onClose={() => setOpenMobileCartMenu(false)}
      sx={{
        "& .MuiPaper-root": {
          top: 55,
        },
        display: {
          xs: "block",
          sm: "none",
        },
      }}
    >
      <Box
        sx={{
          minWidth: "20rem",
          p: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Cart
          </Typography>
          <IconButton onClick={() => setOpenMobileCartMenu(false)}>
            <Clear />
          </IconButton>
        </Stack>
        <List sx={{ padding: "1rem 0" }}>
          <ListItem
            onClick={() => console.log("Ahoj")}
            sx={{
              cursor: "pointer",
              "&:hover": {
                background: "rgba(234, 234, 234, 0.41)",
              },
            }}
            secondaryAction={
              <IconButton>
                <Delete color="error" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar variant="square">
                <CatchingPokemon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Moje zboží" secondary="10x" />
          </ListItem>
        </List>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button sx={{ color: "common.black" }}>Empty the Bin</Button>
          <Button size="small" variant="contained" color="error">
            Buy
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
  return (
    <StyledAppBar>
      <StyledToolBar>
        <Link to="/" onClick={() => setOpenCart(false)}>
          <LogoIcon src="/pokemon-logo.svg" />
        </Link>
        <StyledBox>
          {MENU_ITEMS.map((item) => (
            /* TODO: Přidat Link na správnou adresu */
            <MenuItemStyled key={item.title}>
              <Link to={item.url}>{item.title}</Link>
            </MenuItemStyled>
          ))}
          <IconButton onClick={(e) => handleOpenShoppingCart(e)}>
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </StyledBox>
        <IconsBox>
          <IconButton
            onClick={() => {
              setOpenMobileCartMenu((prev) => !prev);
              setOpenCart(false);
            }}
          >
            <Tooltip title="Open Cart">
              <Badge badgeContent={4} color="error">
                <ShoppingCart />
              </Badge>
            </Tooltip>
          </IconButton>
          {/* TODO: Kouknout jestli zde nejde přidat nějaká animace */}
          {openCart ? (
            <IconButton onClick={() => setOpenCart(false)}>
              <Clear />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setOpenCart(true);
                setOpenMobileCartMenu(false);
              }}
            >
              <MenuButton />
            </IconButton>
          )}
          <Popover
            open={Boolean(anchorElCart)}
            anchorEl={anchorElCart}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            onClose={handleCloseShoppingCart}
          >
            <Box
              sx={{
                minWidth: "20rem",
                p: 2,
              }}
            >
              <div className="arrow">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    Cart
                  </Typography>
                  <IconButton onClick={handleCloseShoppingCart}>
                    <Clear />
                  </IconButton>
                </Stack>
              </div>
              <List sx={{ padding: "1rem 0" }}>
                <ListItem
                  onClick={() => console.log("Ahoj")}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(234, 234, 234, 0.41)",
                    },
                  }}
                  secondaryAction={
                    <IconButton>
                      <Delete color="error" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="square">
                      <CatchingPokemon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Moje zboží" secondary="10x" />
                </ListItem>
              </List>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button sx={{ color: "common.black" }}>Empty the Bin</Button>
                <Button size="small" variant="contained" color="error">
                  Buy
                </Button>
              </Stack>
            </Box>
          </Popover>
        </IconsBox>
      </StyledToolBar>
      {mobileMenu}
      {mobileCartMenu}
    </StyledAppBar>
  );
}

/* MATERIAL UI STYLED COMPONENTS */

/* Chci o stylovat skoro každý MUI component zde, aby potom byl kód více přehledný */
const StyledAppBar = styled(AppBar)({
  position: "sticky",
  zIndex: "1210", // Kvůli Draweru, aby se schoval pod menu
});

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "none",
  minHeight: "inherit",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    padding: " 0 1rem",
  },
}));

const MenuItemStyled = styled(MenuItem)({
  height: "inherit",
  fontSize: "1.5rem",
  "&:hover": {
    backgroundColor: "primary.main",
  },
});
const LogoIcon = styled("img")({
  cursor: "pointer",
  width: "40px",
});

const IconsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
