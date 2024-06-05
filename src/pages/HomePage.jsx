import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
}
