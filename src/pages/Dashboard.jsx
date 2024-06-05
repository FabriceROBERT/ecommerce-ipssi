import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/userContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, clearUserSession } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    clearUserSession();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome, {user.username}</h1>
      <p>Your user ID is {user.id}</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Render more user-specific data as needed */}
    </div>
  );
}
