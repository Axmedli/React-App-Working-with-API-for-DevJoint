import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

const Navigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />

    </Routes>
  );
};

export default Navigator;
