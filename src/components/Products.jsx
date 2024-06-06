import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Container from "./Container";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Récupérer tous les produits
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });

    // Récupérer toutes les catégories
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  // Filtrer les produits en fonction du terme de recherche et de la catégorie sélectionnée
  const filteredProducts = products.filter((product) => {
    // Filtrer par nom y compris majuscule et miniscule
    const nameMatch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtrer par catégorie si une catégorie est sélectionnée
    const categoryMatch =
      selectedCategory === "" || product.category === selectedCategory;

    return nameMatch && categoryMatch;
  });

  return (
    // Container sert à definir une width maximal
    <Container>
      <div className="flex flex-row items-center justify-between mb-4">
        {/* Champ de recherche par nom */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="px-4 py-2 border border-gray-300 rounded-md mr-4"
        />

        {/* Filtre par catégorie */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center flex-wrap justify-center gap-4">
        {filteredProducts.map((product) => (
          <div
            className="bg-white-500 relative rounded mb-20 max-w-52 flex flex-col text-center items-center content-center gap-5 shadow-xl justify-center pb-16"
            key={product.id}
          >
            <div className="mt-0 z-20 relative h-52 w-52">
              <img
                className="h-full w-full z-10 absolute"
                src={product.image}
                alt=""
              />
            </div>
            <h1 className="text-sm uppercase font-bold">
              {/* Si le nom est trop long, les prochaines lettres sont remplacées par "..." */}
              {product.title.length > 22 ? (
                <h1> {product.title.substring(0, 21) + "..."} </h1>
              ) : (
                <h1> {product.title} </h1>
              )}
            </h1>
            <div className="flex flex-row text-base gap-3">
              {product.price.toFixed(2)}{" "}
              <span className="text-[9px] -ml-3 -mt-[2px]">€</span>
              <p className="flex flex-row items-center">
                <FaStar className="text-yellow-500" /> ({product.rating.rate})
              </p>
            </div>
            <Link
              className="hover:bg-sky-900 text-white mt-5 rounded shadow-md bg-sky-800 justify-center p-3 text-center"
              to={`/product/${product.id}`}
            >
              See more
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
