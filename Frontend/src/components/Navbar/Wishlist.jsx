import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import http from "../../services/httpService";
import { api } from "../../utilities";
import Item from "./wishitem";
import Button from "@mui/material/Button";


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
            <Item product={product}/>
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
