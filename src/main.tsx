import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { red, grey } from "@mui/material/colors";

const queryClient = new QueryClient();

let theme = createTheme({
  palette: {
    primary: {
      main: grey[300],
    },
    secondary: {
      main: red["A400"],
    },
  },
  typography: {
    fontFamily: "Arial",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
