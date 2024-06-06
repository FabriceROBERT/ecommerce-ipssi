import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../components/CartContext";

describe("CartProvider", () => {
  beforeEach(() => {
    // Efface le localStorage avant chaque test
    localStorage.clear();
  });

  test("renders children correctly", () => {
    // Test du composant CartProvider avec un enfant fictif
    render(
      <CartProvider>
        <div data-testid="child">Child Component</div>
      </CartProvider>
    );

    // Vérifie que l'enfant est rendu correctement
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("adds product to cart", () => {
    // Rendu du composant CartProvider avec un enfant fictif
    render(
      <CartProvider>
        <div data-testid="child">Child Component</div>
      </CartProvider>
    );

    // Sélectionne le bouton pour ajouter un produit au panier
    const addButton = screen.getByText("Add to Cart");

    // Simule un clic sur le bouton d'ajout au panier
    userEvent.click(addButton);

    // Vérifie que le produit est ajouté au panier (localStorage)
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    expect(storedCart).toHaveLength(1); // Vérifie la longueur du panier
    expect(storedCart[0]).toHaveProperty("id"); // Vérifie que le produit a un identifiant
    expect(storedCart[0]).toHaveProperty("quantity", 1); // Vérifie que la quantité est correcte
  });
});
