import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { red, grey, blue } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
/* V souboru createPalette.d.ts je potřeba přidat vždycky proměnnou a dát jí typ */
let theme = createTheme({
  palette: {
    primary: {
      main: grey[300],
    },
    secondary: {
      main: red["A400"],
    },
    common: {
      pokemonRed: "#FF0000",
    },
  },
  typography: {
    fontFamily: "Arial",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
