import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Container from "./Container";
import toast, { Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Footer from "./Footer";
import { UserContext } from "../components/userContext";
import { CartContext } from "./CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { user, clearUserSession } = useContext(UserContext);

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

  //  Fonction qui ajoute le produit au panier
  const handleAddToCart = () => {
    if (user && quantity >= 1) {
      addToCart({ ...productInfo, quantity: quantity });
      toast.success("Added to cart");
    }
    if (!user) {
      toast.error("Please login to add to cart");
    }
    if (user && quantity < 1) {
      toast.error("Please enter a quantity.");
    }
  };

  // Fonction qui reduit le nombre de l'input
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  // Fonction qui augmente le nombre de l'input

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
                <div className="w-2/4 px-10 rounded shadow-xl py-10 flex flex-col gap-3 bg-zinc-100">
                  <h2 className="text-center uppercase text-2xl font-bold">
                    {productInfo.title}
                  </h2>
                  <p className="text-sm flex flex-col gap-1">
                    <span className="font-bold">About this article :</span>
                    <i> {productInfo.description}</i>
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Category :</span>{" "}
                    {productInfo.category}
                  </p>
                  <p className="flex flex-row text-sm items-center">
                    <span className="font-bold mr-1 ">Rate : </span>{" "}
                    <FaStar className="text-yellow-500" /> (
                    {productInfo.rating.rate})
                  </p>
                  <p>
                    <span className="font-bold">Price :</span>{" "}
                    {productInfo.price} €
                  </p>
                  <div className="flex flex-row  ">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 rounded-l  bg-sky-950 text-white"
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
                      className="px-3 rounded-r bg-sky-950 text-white"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="px-px py-3 shadow-xl rounded text-white hover:bg-sky-900 bg-sky-950 animate"
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
      <Toaster position="top-center" />
    </div>
  );
}
