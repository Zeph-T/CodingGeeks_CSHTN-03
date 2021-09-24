import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Fab } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CartItem from "./CartItem";
import WrappedButton from "../common/WrappedButton";
import { Typography } from "@mui/material";

const Cart = ({ cart, setCartOpen, cartOpen }) => {
  const getTotal = () => {
    let total = 0;
    for (let item in cart) {
      total += cart[item].item.cost * cart[item].qty;
    }
    console.log(total);
    return total;
  };
  return (
    <Dialog
      maxWidth="xl"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      fullWidth={true}
    >
      <DialogTitle style={{ textAlign: "center" }}>Cart</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {cart.map((cart_item) => (
            <CartItem cart_item={cart_item} />
          ))}
        </DialogContentText>

        <div className="row d-flex justify-content-between">
          {" "}
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            Total Amount To Pay: {getTotal()} Only
          </Typography>
          <WrappedButton
            variant="contained"
            color="primary"
            name="Proceed To CheckOut"
            style={{ marginTop: "1.4rem", marginRight: "1rem" }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCartOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
