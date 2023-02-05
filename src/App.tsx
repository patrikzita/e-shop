import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import Boxes from "./pages/boxes";
import Cards from "./pages/cards";
import Home from "./pages/home";

export function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/boxes" element={<Boxes />} />
      </Routes>
    </>
  );
}
