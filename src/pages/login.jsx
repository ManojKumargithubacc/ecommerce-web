import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import { useAuth } from "../context/auth.jsx";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate("/");
        toast.success("Logged in successfully");
      } else {
        toast.error("Log in Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="register">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter a valid e-mail"
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Atleast 8 characters"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary ">
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </Layout>
  );
}

export default Login;
