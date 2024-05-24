import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage.jsx";
import PageNotFound from "../pages/pageNotFound.jsx";
import Register from "../pages/auth/register.jsx";
import Login from "../pages/login.jsx";
import CartPage from "../pages/cart.jsx";
import DashBoard from "../pages/user/dashBoard.jsx";
import Profile from "../pages/user/profile.jsx";
import PrivateRoute from "./privateRoutes.jsx";
import { AuthProvider } from "../context/auth";
import Layout from "../components/layout/layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "../redux/checkoutredux.jsx";
import { useSelector } from "react-redux";

function App() {
  const hasCheckedOut = useSelector((state) => state.checkout.hasCheckedOut);

  return (
    <AuthProvider>
      <ReduxProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {hasCheckedOut && (
              <Route path="/dashboard" element={<PrivateRoute Component={DashBoard} />} />
            )}
            <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
            <Route path="/cart" element={<PrivateRoute Component={CartPage} />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Layout>
      </ReduxProvider>
    </AuthProvider>
  );
}

export default App;
