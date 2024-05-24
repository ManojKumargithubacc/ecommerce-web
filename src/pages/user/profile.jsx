import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdEditNote } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateFormModal from "../../components/modals/userUpdateModal";
import PasswordFormModal from "../../components/modals/passwordUpdateModal";
import {
  fetchUserDetails,
  fetchOrderData,
  updateProfile,
  updatePassword,
} from "../../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setEmail] = useState("");
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [actualCurrentPassword, setActualCurrentPassword] = useState("");

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("Email not found in localStorage");
        }

        const user = await fetchUserDetails(email);
        setUser(user);
        setEmail(email);
        setUpdatedUserDetails({
          name: user.name,
          email: user.email,
          mobileNumber: user.mobileNumber,
        });
        setActualCurrentPassword(user.password);

        const userId = localStorage.getItem("userId");
        const orders = await fetchOrderData(userId);
        setOrders(orders);
      } catch (error) {
        console.error(error.message);
      }
    };

    initializeProfile();
  }, []);

  const handleInputChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordError(null);
    setActualCurrentPassword("");
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await updateProfile(updatedUserDetails, email);
      setUser(updatedUser);
      setShowUpdateForm(false);
      toast.success("Profile updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Error updating profile", {
        position: "top-center",
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!validatePasswords()) return;
      if (passwords.currentPassword !== actualCurrentPassword) {
        setPasswordError("Current password is not valid");
        return;
      }

      await updatePassword(email, passwords.currentPassword, passwords.newPassword);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError(null);
      toast.success("Password updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Error updating password", {
        position: "top-center",
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <>
      <div className="Profile">
        <h1>User Profile</h1>
        {user && (
          <>
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
              <MdEditNote onClick={() => setShowUpdateForm(true)} size={50} />
              <Button
                variant="contained"
                onClick={() => setShowPasswordForm(true)}
              >
                Change Password
              </Button>
            </div>
            <UpdateFormModal
              open={showUpdateForm}
              handleClose={() => setShowUpdateForm(false)}
              handleUpdateProfile={handleUpdateProfile}
              updatedUserDetails={updatedUserDetails}
              handleInputChange={handleInputChange}
              originalUserDetails={user}
              email={email}
            />
            <PasswordFormModal
              open={showPasswordForm}
              handleClose={() => setShowPasswordForm(false)}
              handleUpdatePassword={handleUpdatePassword}
              passwords={passwords}
              handlePasswordChange={handlePasswordChange}
              passwordError={passwordError}
              actualCurrentPassword={actualCurrentPassword}
            />
            <div className="orders-section">
              <h2>Order History</h2>
              {orders.length > 0 ? (
                <ul className="order-list">
                  {orders.map((order, index) => (
                    <li key={index} className="order-card">
                      <div className="order-header">
                        <h3>Order ID: {order._id}</h3>
                        <p>
                          Order Date:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          Sub Total:{" "}
                          {formatCurrency(
                            order.items.reduce(
                              (sum, item) => sum + item.total,
                              0
                            )
                          )}
                        </p>
                      </div>
                      <div className="order-items">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="order-item">
                            <p>Product Name: {item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: {formatCurrency(item.total)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="order-address">
                        <h4>Delivery Address:</h4>
                        <p>{order.address.addressLine1}</p>
                        <p>{order.address.addressLine2}</p>
                        <p>
                          {order.address.city}, {order.address.state} -{" "}
                          {order.address.postalCode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
