import React from "react";
import { Card, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCheckout } from "../redux/checkoutredux";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = () => {
    try {
      let subTotal = 0;
      cart?.forEach((product) => {
        subTotal += product.price * product.quantity;
      });
      return subTotal.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (productid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === productid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((product) =>
      product._id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) =>
      product._id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    dispatch(setCheckout(true));
    setCart([]);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hi!! ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length ? "Welcome to your cart" : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((product) => (
              <div className="row mb-2 p-3-card flex-row" key={product._id}>
                <div className="col-md-4">
                  <Card>
                    <CardMedia
                      style={{ objectFit: "contain" }}
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                  </Card>
                </div>
                <div className="col-md-8">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <h6>Price: ₹ {product.price}</h6>
                  <div className="quantity-control">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCartItem(product._id);
                      }}
                    >
                      Remove
                    </button>
                    <div className="quantity">
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          decreaseQuantity(product._id);
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          increaseQuantity(product._id);
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                  <h6>Total: ₹ {product.price * product.quantity}</h6>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            {cart?.length > 0 && (
              <>
                <h2>Cart Summary</h2>
                <hr />
                <h4>Sub-Total : {totalPrice()}</h4>
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
