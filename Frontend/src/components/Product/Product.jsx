import React, { useState } from "react";
import ProductImage from "../../static/productdemo.jpeg";
import HeaderStyled from "../Navbar/styled/HeaderStyle";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Product = ({ history, match, user }) => {
  const [cart, setCart] = useState([]);
  const product = {
    _id: "12142",
    name: "1Mile N95 Travel Safety Kit",
    type: "Packet of 1 Kit",
    category: "Covid Test & Prevention",
    price: "₹469",
    manufacturer: "1Mile HealthCare",
    categories: ["Covid Test & Prevention"],
    quantity: 4,
  };
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
     
    history.push(`/cart`);
  };
  const handleSubmit = () => {};
  return (
    <div className="product_div">
      <Container component="main" maxwitdh="lg" m={0}>
        <Grid container>
          <Grid item md={12} lg={6}>
            <img
              alt="Example Alt"
              src="https://source.unsplash.com/600x600/?medicine"
              witdth="240px"
              height="480px"
            />
          </Grid>
          <Grid item md={12} lg={6}>
            <div className="product-info">
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
              <br /> <br />
              {product.quantity > 0 && (
                <span className="in-stock">In Stock. </span>
              )}
              {product.quantity == 0 && (
                <span className="out-of-stock">Out of Stock </span>
              )}
            </div>
            <br />
            <br />
            <div classname="buy-product">
              <form>
                <div className="row">
                  <p className="col">Quantity:</p>
                    <Form.Control
                      className="count col"
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                </div>
                <button
                  type="button"
                  class="btn btn-warning asdf"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
      {/* <Paper className elevation={3}>
        <Row>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Price:{product.price}</ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item variant="flush">
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row
        </Row> */}
      {/* </Paper> */}
    </div>
  );
};

export default Product;
