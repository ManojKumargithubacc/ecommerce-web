import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/layout/layout.jsx";
import { useAuth } from "../context/auth.jsx";
import { useCart } from "../context/cart.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../styles/productcard.css";
import "../styles/filter.css";
import "../styles/cartTable.css";

function HomePage() {
  const initialState = {
    products: [],
    categories: [],
    selectedCategory: "",
    subcategories: [],
    selectedSubcategory: "",
    filteredProducts: [],
    cartItems: [],
  };

  const [state, setState] = useState(initialState);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const {
    products,
    categories,
    selectedCategory,
    subcategories,
    selectedSubcategory,
    filteredProducts,
    cartItems,
  } = state;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/products`
        );
        setState((prevState) => ({
          ...prevState,
          products: response.data[0],
          categories: [
            ...new Set(response.data[0].map((product) => product.category)),
          ],
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProductsByCategory = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : [];
    setState((prevState) => ({
      ...prevState,
      filteredProducts: filteredProductsByCategory,
      subcategories: [
        ...new Set(
          filteredProductsByCategory.map((product) => product.subcategory)
        ),
      ],
      selectedSubcategory: "",
    }));
  }, [selectedCategory, products]);

  useEffect(() => {
    let updatedFilteredProducts = products;
    if (selectedCategory) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (selectedSubcategory) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }
    setState((prevState) => ({
      ...prevState,
      filteredProducts: updatedFilteredProducts,
    }));
  }, [selectedSubcategory, selectedCategory, products]);

  const handleCategoryChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: e.target.value,
    }));
  };

  const handleSubcategoryChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedSubcategory: e.target.value,
    }));
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(`${product.subcategory} quantity increased!`, {
        position: "top-right",
      });
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, newProduct]));
      toast.success(`${product.subcategory} added to cart!`, {
        position: "top-right",
      });
    }
  };
  return (
    <Layout>
      <div className="center-container">
        <div className="categories">
          <select
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option>Available categories</option>
            {categories.map((category, index) => (
              <option id="catgory-option" key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory && (
          <div className="categories">
            <select
              id="subcategory"
              onChange={handleSubcategoryChange}
              value={selectedSubcategory}
            >
              <option>Available subcategories</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="Grid">
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <div className="Card">
                <Card>
                  <CardMedia
                    style={{ objectFit: "contain" }}
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {product.subcategory}
                    </Typography>
                    <Typography variant="body2">
                      Price: ₹{product.price}
                    </Typography>
                    <Typography variant="body2">
                      Description: {product.description}
                    </Typography>
                    <div className="addtocart">
                      <Typography variant="body2">
                        <button
                          // onClick={() => {
                          //   setCart([...cart, product]);
                          //   localStorage.setItem(
                          //     "cart",
                          //     JSON.stringify([...cart, product])
                          //   );
                          //   toast.success(
                          //     `${product.subcategory} added to cart!`,
                          //     {
                          //       position: "top-right",
                          //     }
                          //   );
                          // }}
                          onClick={() => handleAddToCart(product)}
                        >
                          ADD <i className="fa fa-shopping-cart"></i>
                        </button>
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export default HomePage;
