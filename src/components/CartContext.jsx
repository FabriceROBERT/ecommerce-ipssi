import React, { createContext, useState, useEffect } from "react";

// Créez le contexte du panier
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialisez l'état du panier
  const [cart, setCart] = useState([]);

  // Récupére le panier depuis localStorage lorsque le composant est monté
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Ajoute un produit au panier
  const addToCart = (product) => {
    // Vérifie si le produit est déjà dans le panier
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si le produit est déjà dans le panier, mettez à jour la quantité
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Si le produit n'est pas dans le panier, cela ajoute avec la quantité
      const updatedCart = [...cart, { ...product, quantity: product.quantity }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
