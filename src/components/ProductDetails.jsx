import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Container from "./Container";
import Footer from "./Footer";
import { CartContext } from "./CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart, addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProductInfo(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (quantity >= 1) {
      addToCart({ ...productInfo, quantity: quantity });
    } else {
      window.alert("Please enter a valid quantity.");
    }
  };

  const removeFromCart = () => {
    if (cart && productInfo) {
      // Ajoutez une vérification de nullité pour cart
      const newCart = cart.filter((item) => item.id !== productInfo.id);
      setCart(newCart);
    } else {
      window.alert("Please Select a Shirt Size");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full">
        <Container>
          <div className="text-sm text-left mb-10">
            <Link to="/">Go back</Link>
          </div>
          {productInfo && (
            <div>
              <div className="flex gap-10 flex-row content-center mx-auto justify-center items-center">
                <div className="h-72 w-72">
                  <img
                    className="w-full object-content h-full"
                    src={productInfo.image}
                    alt={productInfo.title}
                  />
                </div>
                <div className="w-2/4 px-10 shadow-xl py-10 flex flex-col gap-4 bg-slate-300">
                  <h2 className="text-center uppercase text-2xl font-bold">
                    {productInfo.title}
                  </h2>
                  <p className="text-sm flex flex-col gap-1">
                    <span className="font-bold">About this article :</span>
                    {productInfo.description}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Category :</span>{" "}
                    {productInfo.category}
                  </p>
                  <p>
                    <span className="font-bold">Price :</span>{" "}
                    {productInfo.price} €
                  </p>
                  <div className="flex flex-row gap-1">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 rounded bg-red-500"
                    >
                      -
                    </button>
                    <input
                      value={quantity}
                      className="w-8 text-center"
                      type="number"
                      min="0"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="px-3 rounded bg-green-500"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="px-px py-3 shadow-xl rounded text-white hover:bg-sky-900 bg-sky-800 animate"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
