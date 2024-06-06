import { FaSearch, FaShoppingCart } from "react-icons/fa";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/userContext";
import MarqueeDisplay from "./MarqueeDisplay";
import Logo from "../assets/img/Logo.png";
import Container from "./Container";

export default function Navbar() {
  const { user, clearUserSession } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserSession();
    navigate("/login");
  };
  // Affichage de la navbar si l'utilsateur est connecté
  if (user) {
    return (
      <div className="mb-20 bg-black text-white shadow-xl">
        <Container>
          <div className="py-8   flex flex-row justify-between px-5">
            <div className="flex items-center flex-row gap-5">
              <Link to={"/"}>
                <img className="aboslute h-10 w-10 z-20 " src={Logo} alt="" />
              </Link>
              <span className="text-sm">Welcome, {user.username} </span>
            </div>

            <div className="flex items-center justify-evenly gap-5 flex-row ">
              <div className="flex text-sm flex-row gap-5 items-center">
                <Link to={"/cart"}>
                  <div className="flex bg-slate-800 px-2 py-1 rounded flex-row items-center gap-1">
                    {/* Icone du panier */}
                    <FaShoppingCart />
                    <span>Cart</span>
                  </div>
                </Link>
                <button
                  className="bg-gray-800 text-white px-2 py-1 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Container>
        {/* Défilement offre livraison gratuite */}
        <MarqueeDisplay />
      </div>
    );
  } else {
    // Affichage de la navbar si l'utilsateur n'est pas connecté
    return (
      <div className="bg-black text-white mb-20 z-10 shadow-xl">
        <Container>
          <div className="py-8  flex flex-row justify-between px-5  ">
            <Link to={"/"}>
              <img className="aboslute h-10 w-10 z-20 " src={Logo} alt="" />
            </Link>

            <div className="flex items-center rounded bg-slate-800 px-2 py-1 flex-row gap-1">
              <Link to={"/login"}>Sign In</Link>
            </div>
          </div>
        </Container>
        {/* Défilement de l'offre livraison gratuite avec >= 50€ d'achats */}
        <MarqueeDisplay />
      </div>
    );
  }
}
