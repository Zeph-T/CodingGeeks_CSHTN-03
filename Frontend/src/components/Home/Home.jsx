import React, { useEffect, useState } from 'react';
import { api } from "../../utilities";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Slide
} from "@material-ui/core";
import http from "../../services/httpService";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function Start() {
      const jwt = localStorage.getItem("token");
      const { data } = await http.get(
        api.BASE_URL + api.GET_ITEMS_FOR_HOME_PAGE,
        { headers: { accesstoken: jwt } }
      );
      console.log(data);
      setProducts(data);
    }
    Start();
  }, []);  
  const slice = (text, count = 20) => {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  }
  return (
    <div className="container-fluid">
      {products.map((product) => (
        <div className="mt-5">
          <Container component="main" maxWidth="xl">
            <Paper className="" elevation={3}>
              <h1 className="category-head">{product.category}</h1>
              <hr />
              <div className="row d-flex justify-content-between">
                {product.items.map((item) => (
                  <div className="col p-2 m-4 prod-info-home">
                    <img
                      className="prod-img-home"
                      alt="medicine"
                      src="https://source.unsplash.com/200x200/?medicine"
                    />
                     <p className="price-home">
                      {item.name}
                    </p>
                    <p className="product-manuf">By {item.manufacturer}</p>
                    <hr />
                    <p>
                      Price: <span className="price">{item.price}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Paper>
          </Container>
        </div>
      ))}
    </div>
  );
}

export default Home;