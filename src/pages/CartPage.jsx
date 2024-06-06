import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../components/CartContext";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decreaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const freeShippingThreshold = 50; // Livraison gratuite pour les commandes de plus de 50 €
  const total = calculateTotal();
  const hasFreeShipping = total >= freeShippingThreshold;

  const handleBuy = () => {
    // Afficher le toast de succès
    toast.success("Purchase successful!");
    // Redirige vers la page d'accueil après un court délai
    setTimeout(() => {
      navigate("/");
    }, 2000);
    // Permet de vider le panier après l'achat si nécessaire
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="mb-3">{item.price} €</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-4  rounded bg-sky-950 text-white"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-4  rounded bg-sky-950 text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="px-4 py-2 rounded bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          {/* ToFixed(2) permet d'obtenir 2 chiffres après la virgule */}
          <h2 className="text-xl font-bold">Total : {total.toFixed(2)} €</h2>
          {hasFreeShipping ? (
            <p className="text-green-500">
              Congratulations! You have free shipping.
            </p>
          ) : (
            <p>
              Add items worth {(freeShippingThreshold - total).toFixed(2)} €
              more to get free shipping.
            </p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={handleBuy}
              className="px-8 py-2 rounded bg-sky-950 text-white"
            >
              Buy
            </button>
          </div>
        )}
        <div className="text-center mt-6">
          <Link to="/" className="text-blue-500">
            Continue Shopping
          </Link>
        </div>
      </Container>
      <Footer />
      {/* Toaster n'a rien comme particularité dans l'aspect visuel, ce composant agit sous forme de pop-up une fois cliqué sur add */}
      <Toaster position="top-center" />
    </div>
  );
};

export default CartPage;
