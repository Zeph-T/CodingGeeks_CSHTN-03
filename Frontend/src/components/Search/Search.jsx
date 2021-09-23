import React from "react";
import { Grid , Typography} from "@mui/material";

function Search() {
  const results = [
    {
      _id: "12142",
      name: "1Mile N95 Travel Safety Kit",
      type: "Packet of 1 Kit",
      category: "Covid Test & Prevention",
      price: "₹469",
      manufacturer: "1Mile HealthCare",
      categories: ["Covid Test & Prevention"],
      quantity: 4,
    },
    {
      _id: "12147",
      name: "1Mile N95 Travel Safety Kit",
      type: "Packet of 1 Kit",
      category: "Covid Test & Prevention",
      price: "₹469",
      manufacturer: "1Mile HealthCare",
      categories: ["Covid Test & Prevention"],
      quantity: 4,
    },
    {
      _id: "12147",
      name: "1Mile N95 Travel Safety Kit",
      type: "Packet of 1 Kit",
      category: "Covid Test & Prevention",
      price: "₹469",
      manufacturer: "1Mile HealthCare",
      categories: ["Covid Test & Prevention"],
      quantity: 4,
    },
    {
      _id: "12147",
      name: "1dfajiop Kit",
      type: "Packet of 1 Kit",
      category: "Covid Test & Prevention",
      price: "₹469",
      manufacturer: "1Mile HealthCare",
      categories: ["Covid Test & Prevention"],
      quantity: 4,
    },
  ];
  return (
    <div className="container mt-5">
      {results.map((product) => (
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
                <Typography component="h1" variant="h5">
                  {product.name}, {product.type}
                </Typography>
                <p className="product-manuf">By {product.manufacturer}</p>
                <hr />
                <p>
                  Price: <span className="price">{product.price}</span>
                </p>
                Category:{" "}
                <span className="prod-category"> {product.category}</span>
              </div>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default Search;
