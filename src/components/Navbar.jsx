import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/fandp.png";
import "../style/Navbar.css";

export default function Navbar() {
  // const { user, clearUserSession } = useContext(UserContext);

  return (
    <>
      <nav className="nav">
        <div className="Name_Logo">
          <img className="Logo" src={Logo} alt="" />
        </div>
        <div className="Links_Cart">
          <div className="Login_Dash">
            <Link to="/login"> Login </Link>
            <Link to="/dashboard"> Dashboard </Link>
          </div>

          <div className="shopping_cart">
            <FaShoppingCart />
            <span>Cart</span>
          </div>
        </div>
      </nav>
      <div className="Banner">
        <h2 className="Sorting">Sorting</h2>
        <select className="Select">
          <option value="">Default Sorting</option>
          <option value="">Sort by descending price</option>
          <option value="">Sort by ascending price</option>
        </select>
      </div>
    </>
  );
}
