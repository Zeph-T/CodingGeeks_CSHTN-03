import React from "react";
import { Grid } from "@mui/material";
import WrappedButton from "../common/WrappedButton";
const Item = ({ product }) => {
  console.log(product);
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
              </p>
              <WrappedButton
                variant="contained"
                color="danger"
                name="Remove"
                onClick
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Item;