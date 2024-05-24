import React, { useState } from "react";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { loginUser } from "../services/loginService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      if (res && res.success) {
        const { token, user } = res;
        const userId = user._id;

        setAuth({
          ...auth,
          user,
          token,
        });

        localStorage.setItem("auth", JSON.stringify({ user, token }));
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Log in Failed");
    }
  };
  return (
    <>
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
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword"
                placeholder="At least 8 characters"
                required
              />
              <div className="visibility-icon">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary ">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
