import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { lazy, Suspense } from "react";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

const Cards = lazy(() => import("./pages/cards"));
const Boxes = lazy(() => import("./pages/boxes"));
const Home = lazy(() => import("./pages/home"));

export function App() {
  return (
    <>
      <ShoppingCartProvider>
        <NavBar />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/boxes" element={<Boxes />} />
          </Routes>
        </Suspense>
      </ShoppingCartProvider>
    </>
  );
}
