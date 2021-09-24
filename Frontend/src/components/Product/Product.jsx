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
import useStyles from "./styles";
import WrappedButton from "../common/WrappedButton";

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
  const [cartProgress , setCartProgress] = useState(false);
  const [wishProgress , setWishProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const jwt = localStorage.getItem("token");
  useEffect(() => {
    async function Start() {
      const { data } = await http.get(api.BASE_URL + api.GET_PRODUCT + props.match.params.id, {
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
    setCartProgress(true);
    http.post(api.BASE_URL + api.ADD_CART,{itemId : product._id , qty :qty},{headers: { accesstoken: jwt }}).then(response=>{
      if(response.data.success){
        props.openSnackBar('Added To Cart');
      }else{
        props.openSnackBar('Error Adding to Cart');
      }
    }).catch(err=>{
      props.openSnackBar(err);
    });
    setCartProgress(false);
  };
   const addToWishListHandler = () => {
    setCartProgress(true);
    http.post(api.BASE_URL + api.ADD_TO_WISHLIST,{itemId : product._id },{headers: { accesstoken: jwt }}).then(response=>{
      if(response.data.success){
        props.openSnackBar('Added To Wishlist');
      }else{
        props.openSnackBar('Error Adding to Cart');
      }
    }).catch(err=>{
      props.openSnackBar(err);
    });
    setCartProgress(false);
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
                Price: <span className="price">&#x20b9;  {product.cost}</span>
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
                    {[...Array(product.qty).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <WrappedButton 
                  disabled={cartProgress}
                  onClick={addToCartHandler}
                  style={{ width: "100%",marginTop : '1rem' }}
                  color="primary"
                  icon=""
                  name="add to cart"
                  buttonKey="loginButton"
                  variant="contained"
                />
                {/* <button
                  type="button"
                  class="btn btn-warning asdf"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                </button> */}
                <WrappedButton 
                  disabled={wishProgress}
                  onClick={addToWishListHandler}
                  style={{ width: "100%",marginTop : '1rem' }}
                  color="secondary"
                  icon=""
                  name="add to wishlist"
                  buttonKey="loginButton"
                  variant="contained"
                />
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Product;
