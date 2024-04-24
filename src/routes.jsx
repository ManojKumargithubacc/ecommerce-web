import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Policy from "./pages/policy.jsx";
import PageNotFound from "./pages/pageNotFound.jsx";
import Register from "./pages/auth/register.jsx";
import Login from "./pages/login.jsx";
import CartPage from "./pages/cart.jsx";
import DashBoard from "./pages/user/dashBoard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
