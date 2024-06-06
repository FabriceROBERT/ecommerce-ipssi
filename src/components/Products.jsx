import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "./Container";
import '../style/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Container>
      <div className=" flex flex-row  items-center flex-wrap justify-center gap-4">
        {products.map((product) => (
          <div
            className="bg-white-500 relative rounded  mb-20 max-w-52 flex flex-col text-center items-center content-center gap-5 shadow-xl justify-center pb-16 "
            key={product.id}
          >
            <div className="mt-0  z-20 relative h-52 w-52">
              <img
                className="  h-full w-full  z-10  absolute"
                src={product.image}
                alt=""
              />
            </div>
            <h1 className="text-sm">
              {product.title.length > 27 ? (
                <h1> {product.title.substring(0, 26) + "..."} </h1>
              ) : (
                <h1> {product.title} </h1>
              )}
            </h1>
            <a href=""> details </a>
            
            <p>{product.price} €</p>
            <button className="addCart"> Add to Cart </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
