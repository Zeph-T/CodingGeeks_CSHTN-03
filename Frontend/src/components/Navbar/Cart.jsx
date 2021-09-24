import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Fab } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Cart = ({ cart, setCartOpen, cartOpen }) => {
  const [searchItem, setQuery] = useState("");
  useEffect(() => {
    async function Start() {
     
    }
    Start();
  }, []);
  return (
    <Dialog
      maxWidth="xl"
      open={cartOpen}
      onClose={setCartOpen}
      fullWidth={true}
    >
      <DialogTitle>Optional sizes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        ></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={setCartOpen}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
