import React, { useState, useEffect } from "react";
import ProductImage from "../../static/productdemo.jpeg";
import HeaderStyled from "../Navbar/styled/HeaderStyle";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  LinearProgress,
} from "@material-ui/core";
import { api } from "../../utilities";
import http from "../../services/httpService";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Product = (props) => {
  const [cart, setCart] = useState([]);
  // const product = {
  //   _id: "12142",
  //   name: "1Mile N95 Travel Safety Kit",
  //   type: "Packet of 1 Kit",
  //   category: "Covid Test & Prevention",
  //   price: "₹469",
  //   manufacturer: "1Mile HealthCare",
  //   categories: ["Covid Test & Prevention"],
  //   quantity: 4,
  // };
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function Start() {
      const jwt = localStorage.getItem("token");
      const { data } = await http.get(api.BASE_URL + api.GET_PRODUCT + props.computedMatch.params.id, {
        headers: { accesstoken: jwt },
      });
      setProduct(data);
      setLoading(false);
    }
    Start();
  }, []);
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    props.history.push(`/cart`);
  };
  const handleSubmit = () => {};
  if (loading === true) {
    return (
      <div className="verticalCenterAligned">
        <h2>GETTING THE PRODUCT</h2>
        <LinearProgress color="secondary" />
      </div>
    );
  }
  return (
    <div className="product_div">
      <Container component="main" maxwitdh="lg" m={0}>
        <Grid container>
          <Grid item md={12} lg={6}>
            <img
              alt="Example Alt"
              src="https://source.unsplash.com/600x600/?medicine"
              witdth="240px"
              height="480px"
            />
          </Grid>
          <Grid item md={12} lg={6}>
            <div className="product-info">
              <Typography component="h1" variant="h5">
                {product.name}, {product.type}
              </Typography>
              <p className="product-manuf">By {product.manufacturer}</p>
              <hr />
              <p>
                Price: <span className="price">&#x20b9;  {product.price}</span>
              </p>
              Category:{" "}
              <span className="prod-category"> {product.category}</span>
              <br /> <br />
              {product.quantity > 0 && (
                <span className="in-stock">In Stock. </span>
              )}
              {product.quantity == 0 && (
                <span className="out-of-stock">Out of Stock </span>
              )}
            </div>
            <br />
            <br />
            <div classname="buy-product">
              <form>
                <div className="row">
                  <p className="col">Quantity:</p>
                  <Form.Control
                    className="count col"
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.quantity).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <button
                  type="button"
                  class="btn btn-warning asdf"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Product;
