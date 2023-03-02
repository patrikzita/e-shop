import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type CarouselProps = {
  title: string;
  buttonTitle: string;
  url: string;
  imgUrl: string;
  textPosition: string;
  bgColor: string;
};

const CarouselItem = ({
  title,
  buttonTitle,
  url,
  imgUrl,
  textPosition,
  bgColor,
}: CarouselProps) => {
  const ImgComponent = styled("div")(({ theme }) => ({
    background: `url(${imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "70%",
    width: "100%",
    height: "100%",
    maxHeight: "320px",
    [theme.breakpoints.up("sm")]: {
      backgroundSize: "70%",
      maxHeight: "100%",
    },
  }));

  return (
    <Box
      sx={{
        display: { xs: "block", sm: "block", md: "flex" },
        flexDirection: `${textPosition === "right" ? "row" : "row-reverse"}`,
        height: "60vh",
        bgcolor: bgColor,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: { xs: "60%", sm: "60%", md: "100%" },
          width: "100%",
        }}
      >
        <ImgComponent />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        flex="0 0 40%"
        sx={{ p: 3 }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: { xs: 0, sm: 0, md: 3 },
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            sx={{
              fontWeight: "500",
              fontSize: { xs: "2.1rem", sm: "2.4rem", md: "3rem" },
            }}
          >
            {title}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={url}
            sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}
          >
            {buttonTitle}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CarouselItem;
