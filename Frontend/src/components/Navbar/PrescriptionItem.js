import React, { useState } from "react";
import { Grid } from "@mui/material";
import http from "../../services/httpService";
import { api } from "../../utilities";
import WrappedButton from "../common/WrappedButton";
import TextField from '@mui/material/TextField';


const PrescriptionItem = (props) => {

    const [cartProgress, setCartProgress] = useState(false);
    const [wishProgress, setWishProgress] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const jwt = localStorage.getItem("token");

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

    const handleQuantityChange = (event) => {
        if (event.target.value < 1)
            setQuantity(1);
        if (event.target.value >quantity)
        setQuantity(quantity);
        else
        setQuantity(event.target.value)
    }


    return (
        <div className="header_wraper" key={props.product._id} >
            <Grid container item spacing={1}>
                <Grid md={6} item justify="center" style={{marginLeft:'8rem'}}>
                    <img
                        className="prod-img"
                        alt="Example Alt"
                        src="https://source.unsplash.com/150x150/?medicine"
                    />
                </Grid>
                <Grid md={20} item justify="center" >
                    <div className="product-info mt-8 pd-8" >
                        <a className="price-cart" href={"/product/" + props.product._id}>
                            {props.product.name}
                        </a>
                        <p className="product-manuf">By {props.product.manufacturer}</p>
                        <hr />
                        <p>
                            Price:
                            <span className="price-cart">&#x20b9; {props.product.cost} Each</span>
                        </p>
                        <br /> <br />
                        {props.product.qty > 0 && (
                            <span className="in-stock">In Stock. </span>
                        )}
                        {props.product.qty == 0 && (
                            <span className="out-of-stock">Out of Stock </span>
                        )}
                        <p className="col">Quantity:</p>
                        <TextField id="outlined-basic" label="Quantity" variant="outlined" type='number' value={quantity} onChange={(event) => handleQuantityChange(event)} />
                        <WrappedButton
                            disabled={cartProgress}
                            onClick={addToCartHandler}
                            style={{ width: "20%", marginTop: '1rem' }}
                            color="primary"
                            icon=""
                            name="add to cart"
                            buttonKey="loginButton"
                            variant="contained"
                            style={{padding:'1rem', margin:' 0rem 1rem'}}
          

                        />
                        <WrappedButton
                            disabled={wishProgress}
                            onClick={addToWishListHandler}
                            style={{ width: "20%", marginTop: '1rem' }}
                            color="secondary"
                            icon=""
                            name="add to wishlist"
                            buttonKey="loginButton"
                            variant="contained"
                            style={{padding:'1rem', margin:'0rem 1rem'}}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default PrescriptionItem;
