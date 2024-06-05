import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/userContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, setUserSession, clearUserSession } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserSession(JSON.parse(storedUser));
    } else if (!user) {
      navigate("/login");
    }
  }, [user, navigate, setUserSession]);

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
    </div>
  );
}
