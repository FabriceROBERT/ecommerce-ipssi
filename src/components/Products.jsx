import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "./Container";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      console.log(response.data);
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
            <p>{product.price} €</p>
            {/* <p className="text-sm">{product.description}</p> */}
            <Link
              className="hover:bg-fuchsia-800 mt-5 rounded shadow-md bg-fuchsia-700 justify-center p-3 text-center"
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
