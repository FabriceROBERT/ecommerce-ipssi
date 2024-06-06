import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import LoginPage from "./LoginPage";
import { UserContext } from "../components/userContext";

jest.mock("axios");

describe("LoginPage", () => {
  test("renders login form correctly", () => {
    render(<LoginPage />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("handles login with valid credentials", async () => {
    const user = {
      id: 1,
      username: "testuser",
      email: "testuser@example.com",
    };

    axios.post.mockResolvedValueOnce({
      data: { token: "validToken" },
    });

    axios.get.mockResolvedValueOnce({
      data: user,
    });

    const setUserSession = jest.fn();

    render(
      <UserContext.Provider value={{ setUserSession }}>
        <LoginPage />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(setUserSession).toHaveBeenCalledWith(user);
    });
  });

  test("handles login with invalid credentials", async () => {
    axios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "invaliduser" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "invalidpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(
        screen.getByText("Invalid username or password.")
      ).toBeInTheDocument();
    });
  });

  test("handles login with server error", async () => {
    axios.post.mockRejectedValueOnce({
      message: "Server error",
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again later.")
      ).toBeInTheDocument();
    });
  });
});
