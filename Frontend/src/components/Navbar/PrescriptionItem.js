import React,{useState} from "react";
import { Grid } from "@mui/material";
import http from "../../services/httpService";
import { api } from "../../utilities";
import WrappedButton from "../common/WrappedButton";

const PrescriptionItem = ( props ) => {

    const [cartProgress, setCartProgress] = useState(false);
    const [wishProgress, setWishProgress] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const jwt = localStorage.getItem("token");
  console.log(props.product);

  const addToWishListHandler = () => {
    setCartProgress(true);
    http.post(api.BASE_URL + api.ADD_TO_WISHLIST, { itemId: props.product._id }, { headers: { accesstoken: jwt } }).then(response => {
        if (response.data.success) {
            props.openSnackBar('Added To Wishlist');
        } else {
            props.openSnackBar('Error Adding to Cart');
        }
    }).catch(err => {
        props.openSnackBar(err);
    });
    setCartProgress(false);
};

const addToCartHandler = () => {
    setCartProgress(true);
    http.post(api.BASE_URL + api.ADD_CART, { itemId: props.product._id, qty: quantity }, { headers: { accesstoken: jwt } }).then(response => {
        if (response.data.success) {
            props.openSnackBar('Added To Cart');
        } else {
            props.openSnackBar('Error Adding to Cart');
        }
    }).catch(err => {
        props.openSnackBar(err);
    });
    setCartProgress(false);
};


  return (
    <div className="header_wraper" key={props.product._id}>
      <Grid container>
        <Grid item md={4} justify="center">
          <img
            className="prod-img"
            alt="Example Alt"
            src="https://source.unsplash.com/150x150/?medicine"
          />
        </Grid>
        <Grid item md={8}>
          <div className="product-info mt-6 pd-4">
            <a className="price-cart" href={"/product/" + props.product._id}>
              {props.product.name}
            </a>
            <p className="product-manuf">By {props.product.manufacturer}</p>
            <hr />
            <p>
              Price:{" "}
              <span className="price-cart">&#x20b9; {props.product.cost} Each</span>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PrescriptionItem;