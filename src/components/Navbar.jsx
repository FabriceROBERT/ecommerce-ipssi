import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { UserContext } from "../components/userContext";

export default function Navbar() {
  // const { user, clearUserSession } = useContext(UserContext);

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
      </div>
    </div>
  );
}
