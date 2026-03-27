import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import SignupPage from "./pages/signup-page.tsx";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-right" />
    <RouterProvider router={router} />
  </StrictMode>,
);
