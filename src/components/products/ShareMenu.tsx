import { Facebook, Share, Twitter } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

export const ShareMenu = () => {
  const [anchorShareMenu, setAnchorShareMenu] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorShareMenu);

  const handleClickShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorShareMenu(event.currentTarget);
  };
  const handleCloseShareMenu = () => {
    setAnchorShareMenu(null);
  };

  const ShareMenu = (
    <Menu
      id="share-menu"
      open={open}
      anchorEl={anchorShareMenu}
      onClose={handleCloseShareMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Stack direction="column">
        <MenuItem onClick={handleCloseShareMenu}>
          <Twitter sx={{ color: "common.blue" }} />
        </MenuItem>
        <MenuItem onClick={handleCloseShareMenu}>
          <Facebook sx={{ color: "common.blue" }} />
        </MenuItem>
      </Stack>
    </Menu>
  );

  return (
    <>
      <IconButton onClick={handleClickShareMenu}>
        <Share />
      </IconButton>
      {ShareMenu}
    </>
  );
};

export default ShareMenu;
