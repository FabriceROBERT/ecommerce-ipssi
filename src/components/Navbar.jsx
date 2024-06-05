import { FaSearch, FaShoppingCart } from "react-icons/fa";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/userContext";
import MarqueeDisplay from "./MarqueeDisplay";
import Container from "./Container";

export default function Navbar() {
  const { user, clearUserSession } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserSession();
    navigate("/login");
  };

  if (user) {
    return (
      <div className="py-8 mb-20 flex flex-row justify-between px-5 shadow-xl bg-gray-100">
        <div>LOGO</div>
        {/* <div className="flex items-center flex-row gap-1">
        <span>Search</span>
        <input className="rounded" type="text" />
        <button className="bg-gray-300 rounded p-1">
          <FaSearch />{" "}
        </button>
      </div> */}
        <div className="flex items-center flex-row gap-1">
          <FaShoppingCart />
          <span>Cart</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <MarqueeDisplay />
      </div>
    );
  } else {
    return (
      <div className="mb-20 shadow-xl">
        <Container>
          <div className="py-8  flex flex-row justify-between px-5  ">
            <div>LOGO</div>
            {/* <div className="flex items-center flex-row gap-1">
        <span>Search</span>
        <input className="rounded" type="text" />
        <button className="bg-gray-300 rounded p-1">
          <FaSearch />{" "}
        </button>
      </div> */}
            <div className="flex items-center flex-row gap-1">
              <FaShoppingCart />
              <span>Cart</span>
            </div>
          </div>
        </Container>
        <MarqueeDisplay />
      </div>
    );
  }
}
