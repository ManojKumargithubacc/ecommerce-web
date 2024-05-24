import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoute = ({ Component, ...rest }) => {
  const [auth] = useAuth();
  const isAuthenticated = !!auth.token;

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
