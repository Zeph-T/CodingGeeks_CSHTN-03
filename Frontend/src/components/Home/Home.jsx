import React, { useEffect, useState } from "react";
import { api } from "../../utilities";
import { Paper, Container, LinearProgress } from "@material-ui/core";
import WrappedButton from "../common/WrappedButton";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import "../../App.css";
const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function Start() {
      const jwt = localStorage.getItem("token");
      try {
        const { data } = await http.get(
          api.BASE_URL + api.GET_ITEMS_FOR_HOME_PAGE,
          { headers: { accesstoken: jwt } }
        );
        if (data.error) {
          props.history.push("login");
        }
        console.log(data);
        setProducts(data);
      } catch (err) {
        props.history.push("login");
      }
      setLoading(false);
    }
    Start();
  }, []);
  const slice = (text, count = 20) => {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  };
  if (loading === true) {
    return (
      <div className="verticalCenterAligned">
        <h2>GETTING THE ITEMS</h2>
        <LinearProgress color="secondary" />
      </div>
    );
  }
  return (
    <div className="container-fluid">
      {products.map((product) => (
        <div className="mt-5">
          <Container component="main" maxWidth="xl">
            <Paper className="" elevation={3}>
              <div class="d-flex justify-content-between">
                <h1 className="category-head" style={{ marginTop: "1rem" }}>
                  {product.category}
                </h1>
                <a href={"/?search=" + product.category}>
                  <WrappedButton
                    variant="contained"
                    color="primary"
                    name="View All"
                    style={{marginTop: "1.4rem", marginRight: "1rem" }}
                  />
                </a>
              </div>

              <hr />
              <div className="row d-flex justify-content-between">
                {product.items.map((item) => (
                  <div className="col p-2 m-4 prod-info-home">
                    <img
                      className="prod-img-home"
                      alt="medicine"
                      src="https://source.unsplash.com/200x200/?medicine"
                    />
                    <a className="price-home" href={"/product/" + item._id}>
                      {item.name}
                    </a>
                    <p className="product-manuf">By {item.manufacturer}</p>
                    <hr />
                    <p>
                      Price: <span className="price">&#x20b9; {item.cost}</span>
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
};

export default Home;
