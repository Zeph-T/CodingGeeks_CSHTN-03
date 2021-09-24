import React from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import WrappedButton from "../common/WrappedButton";

const cartItem = ({ cart_item, handleRemove }) => {
  const { qty, item: product } = cart_item;
  return (
    <div className="header_wraper" key={product._id}>
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
            <a className="price-cart" href={"/product/" + product._id}>
              {product.name}
            </a>
            <p className="product-manuf">By {product.manufacturer}</p>
            <hr />

            <div class="d-flex justify-content-between">
              <p>
                Price:{" "}
                <span className="price-cart">&#x20b9; {product.cost} Each</span>
                <br />
                Quantity: <span className="prod-category-cart"> {qty}</span>
              </p>
              <WrappedButton
                variant="contained"
                color="danger"
                name="Remove"
                style={{ marginTop: "1.4rem", marginRight: "1rem" }}
                onClick={() => handleRemove(product._id)}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default cartItem;
