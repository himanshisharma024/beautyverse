import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SkinScan from "./pages/SkinScan";
import SkinQuiz from "./pages/SkinQuiz";
import SkinResults from "./pages/SkinResults";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import WellnessHub from "./pages/WellnessHub";
import CategoryGuide from "./pages/CategoryGuide";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CartSidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skin-test" element={<SkinScan />} />
        <Route path="/skin-quiz" element={<SkinQuiz />} />
        <Route path="/skin-results" element={<SkinResults />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wellness" element={<WellnessHub />} />
        <Route path="/guide/:category" element={<CategoryGuide />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;