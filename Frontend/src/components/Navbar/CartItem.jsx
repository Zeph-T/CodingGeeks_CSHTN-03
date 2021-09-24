import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Fab } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const cartItem = ({ cart_item }) => {
  // useEffect(() => {
  //   async function Start() {}
  //   Start();
  // }, []);
  const { qty, item: product } = cart_item;
  return (
    <div className="header_wraper display-box" key={product._id}>
      <Grid container>
        <Grid item md={4} justify="center">
          <img
            className="prod-img"
            alt="Example Alt"
            src="https://source.unsplash.com/200x200/?medicine"
          />
        </Grid>
        <Grid item md={8}>
          <div className="product-info mt-6 pd-4">
            <a className="price-home" href={"/product/" + product._id}>
              {product.name}, {product.type}
            </a>
            <p className="product-manuf">By {product.manufacturer}</p>
            <hr />
            <p>
              Price: <span className="price">&#x20b9; {product.cost} Each</span>
            </p>
            Quantity: <span className="prod-category"> {qty}</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default cartItem;
