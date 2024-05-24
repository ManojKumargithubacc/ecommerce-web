import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const initialState = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      if (res.success) {
        navigate("/login");
        toast.success("Account created successfully");
      } else {
        toast.error("Account already exists");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating account. Please try again.");
    }
  };

  return (
    <>
      <div className="register">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              id="exampleInputName"
              placeholder="Your first and last name"
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter a valid e-mail"
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputMobilenumber" className="form-label">
              Mobile number
            </label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="form-control"
              id="exampleInputMobilenumber"
              placeholder="Enter a valid mobile number"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword"
              placeholder="At least 8 characters"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary ">
            Signup
          </button>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
