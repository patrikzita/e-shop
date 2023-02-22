import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { lazy, Suspense } from "react";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

const Cards = lazy(() => import("./pages/cards"));
const Boxes = lazy(() => import("./pages/boxes"));
const Home = lazy(() => import("./pages/home"));
const ProductDetail = lazy(() => import("./components/products/ProductDetail"));
const ProductForm = lazy(() => import("./components/products/ProductForm"));
const EditProduct = lazy(() => import("././components/products/EditProduct"));
const ErrorComponent = lazy(() => import("./components/Others/ErrorComponent"));

export function App() {
  return (
    <>
      <ShoppingCartProvider>
        <NavBar />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boosters" element={<Cards />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/boxes" element={<Boxes />} />
            <Route path="*" element={<ErrorComponent status={404} />} />
          </Routes>
        </Suspense>
      </ShoppingCartProvider>
    </>
  );
}
