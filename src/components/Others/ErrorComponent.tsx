import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type ErrorProps = {
  status: number;
};

const DESCRIPTION = [
  "We're sorry, the page you requested was not found. Make sure you didn't make a mistake in the URL. The page may have been moved ordeleted.",
  "Welcome to our Pokemon fan page! While we're experiencing some technical difficulties and the server data isn't loading at the moment, we don't want to leave you hanging. We hope you'll enjoy exploring our website and discovering everything there is to know about the wonderful world of Pokemon. From the classic characters like Pikachu and Charizard, to the latest additions from the Galar region, there's always something new and exciting happening in the world of Pokemon. So sit back, relax, and let your imagination run wild as you immerse yourself in the fascinating world of these beloved creatures.",
];

const ErrorComponent = ({ status }: ErrorProps) => {
  const navigate = useNavigate();
  const ImgComponent = styled("div")(({ theme }) => ({
    background: `url("/pikachu.png")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100%",
    width: "100%",
    height: "100%",
    minHeight: "60vh",
    minWidth: "50vw",
  }));
  return (
    <Container sx={{ pt: 3 }}>
      <Stack direction={{ xs: "column-reverse", sm: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            gap: { xs: 3, sm: 2 },
          }}
        >
          <Typography variant="h4">error</Typography>
          <Typography variant="h1">{status}</Typography>
          <Typography>
            {status === 404 ? DESCRIPTION[0] : DESCRIPTION[1]}
          </Typography>
          {status === 404 ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate("/")}
            >
              Return to Home page
            </Button>
          ) : (
            ""
          )}
        </Box>
        <ImgComponent />
      </Stack>
    </Container>
  );
};

export default ErrorComponent;
