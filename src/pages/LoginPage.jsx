import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/userContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserSession } = useContext(UserContext);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          // Decode token to get the user ID
          const payload = JSON.parse(atob(token.split(".")[1]));
          const userId = payload.sub; // Assuming 'sub' contains the user ID

          // Fetch user data after successful login
          axios
            .get(`https://fakestoreapi.com/users/${userId}`)
            .then((userResponse) => {
              const userData = userResponse.data;
              setUserSession(userData);
              localStorage.setItem("user", JSON.stringify(userData));
              navigate("/dashboard");
            })
            .catch((userError) => {
              setError("Failed to fetch user data.");
            });
        } else {
          setError("Invalid username or password.");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <div className="mx-auto my-auto mt-[10%] flex flex-col items-center justify-center content-center  object-center  max-w-sm">
      <div className="bg-gray-200 px-6 text-sm py-8 rounded-xl shadow-md text-gray-800 flex flex-col">
        <h1 className="text-left text-2xl mb-5">Login</h1>
        <div className="">
          <div className="space-x-4 space-y-5 ">
            <label htmlFor="username">Username :</label>
            <input
              className="rounded border-2 border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="space-x-5 space-y-5 ">
            <label htmlFor="password">Password :</label>
            <input
              className="rounded border-2 border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
        <input
          className="mt-10 bg-blue-800 py-2 rounded text-white  px-px"
          type="button"
          value={loading ? "Loading..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
      </div>
    </div>
  );
}
