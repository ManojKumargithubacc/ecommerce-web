import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import App from "./routes/routes";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import store from "./redux/checkoutredux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
    </CartProvider>
  </AuthProvider>
</Provider>
);

reportWebVitals();
