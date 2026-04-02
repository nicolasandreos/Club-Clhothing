import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import SignupPage from "./pages/signup-page.tsx";
import { Toaster } from "sonner";
import { UserProvider } from "./contexts/user-context.tsx";
import { CartProvider } from "./contexts/cart-context.tsx";
import CategoryPage from "./pages/category-page.tsx";
import ExplorePage from "./pages/explore-page.tsx";

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
  {
    path: "/category/:categoryId",
    element: <CategoryPage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </StrictMode>,
);
