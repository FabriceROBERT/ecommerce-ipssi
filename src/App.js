// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/userContext";
import { CartProvider } from "./components/CartContext"; // Import CartProvider
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
