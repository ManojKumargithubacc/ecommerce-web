import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { fetchAllProducts,fetchFilteredProducts } from "../services/productService";
import { useCart } from "../context/cart";
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
  const [cart, setCart] = useCart();
  const {
    products,
    categories,
    selectedCategory,
    subcategories,
    selectedSubcategory,
    filteredProducts,
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProducts();
        setState((prevState) => ({
          ...prevState,
          products: data,
          categories: [...new Set(data.map((product) => product.category))],
          subcategories: [...new Set(data.map((product) => product.subcategory))],
        }));
      } catch (error) {
        console.log('Error:',error)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFilteredProducts(selectedCategory, selectedSubcategory);
        setState((prevState) => ({
          ...prevState,
          filteredProducts: data,
        }));
      } catch (error) {
        console.log('Error:',error)
      }
    };
    fetchData();
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setState((prevState) => ({
      ...prevState,
      selectedCategory,
      selectedSubcategory: "",
      subcategories: selectedCategory
        ? [...new Set(
            state.products
              .filter((product) => product.category === selectedCategory)
              .map((product) => product.subcategory)
          )]
        : [],
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
      toast.success(`${product.name} quantity increased!`, {
        position: "top-right",
      });
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, newProduct]));
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
      });
    }
  };
  return (
    <>
      <div className="home">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              data-bs-interval={1000}
              style={{ maxHeight: "250px" }}
            >
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/c2fc3a5669255ab4.jpg?q=20"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div
              className="carousel-item"
              data-bs-interval={2000}
              style={{ maxHeight: "270px" }}
            >
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/c2cfdd9906968a62.png?q=20"
                className="d-block w-100 "
                alt="..."
              />
            </div>
            <div className="carousel-item" style={{ maxHeight: "270px" }}>
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5483df11b3fc9f0b.jpg?q=20"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div
          className="categories"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <select
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option>Available categories</option>
            {categories.map((category, index) => (
              <option id="category-option" key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedCategory && (
        <div
          className="categories"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
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
        <div className="Grid">
          <Grid container spacing={2}>
            {(selectedCategory && filteredProducts.length > 0
              ? filteredProducts
              : products
            ).map((product) => (
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
                        {product.name}
                      </Typography>
                      <Typography variant="body2">
                        Price: ₹{product.price}
                      </Typography>
                      <Typography variant="body2">
                        Description: {product.description}
                      </Typography>
                      <div className="addtocart">
                        <Typography variant="body2">
                          <button onClick={() => handleAddToCart(product)}>
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
      <ToastContainer/>
    </>
  );
}

export default HomePage;
