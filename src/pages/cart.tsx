import { Container } from "@mui/system";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import CartOrder from "../components/Cart/CartOrder";
import CartTabs from "../components/Cart/CartTabs";

const Cart = () => {
  return (
    <Container>
      <CartTabs />
      <Routes>
        <Route path="/" element={<CartOrder />} />
        <Route path="/payment" element={<h1>payment</h1>} />
        <Route path="/address" element={<h1>address</h1>} />
        <Route path="/summary" element={<h1>summary</h1>} />
      </Routes>
    </Container>
  );
};

export default Cart;
