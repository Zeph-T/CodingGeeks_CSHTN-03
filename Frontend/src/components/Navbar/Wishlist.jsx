import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { api } from "../../utilities";
import Item from "./wishitem";
import Button from "@mui/material/Button";
import logo1 from "../../static/1.jpeg";
import logo2 from "../../static/2.jpeg";
import logo3 from "../../static/3.jpeg";
import logo4 from "../../static/4.jpeg";
import logo5 from "../../static/5.jpeg";
import logo6 from "../../static/6.jpeg";
import logo7 from "../../static/7.jpeg";
import logo8 from "../../static/8.jpeg";
let logoarray = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

const Wishlist = ({ wishlist, setwishOpen, wishOpen }) => {
  return (
    <Dialog
      maxWidth="lg"
      open={wishOpen}
      onClose={() => setwishOpen(false)}
      fullWidth={true}
    >
      <DialogTitle style={{ textAlign: "center" }}>Wishlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {wishlist.map((product) => (
            <Item product={product} />
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setwishOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Wishlist;
