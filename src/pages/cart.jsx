import React from "react";
import Layout from "../components/layout/layout";
import { Card, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((product) => {
        total = total + product.price;
      });
      return total.toLocaleString("en-IN", {
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

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hi!! ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? 'Welcome to your cart'
                : "Your cart is Empty"}
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
                      alt={product.subcategory}
                    />
                  </Card>
                </div>
                <div className="col-md-8">
                  <h4>{product.subcategory}</h4>
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
                          // Decrease quantity
                          decreaseQuantity(product._id);
                        }}
                      >
                        <RemoveIcon />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          // Increase quantity
                          increaseQuantity(product._id);
                        }}
                      >
                        <AddIcon />
                      </button>
                    </div>
                  </div>
                  <h6>Total: ₹ {product.price * product.quantity}</h6>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Sub-Total : {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
