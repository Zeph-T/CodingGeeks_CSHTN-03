import React, { useEffect, useState } from "react";
import { api } from "../../utilities";
import { Paper, Container, LinearProgress } from "@material-ui/core";
import WrappedButton from "../common/WrappedButton";
import http from "../../services/httpService";
import logo1 from "../../static/1.jpeg";
import logo2 from "../../static/2.jpeg";
import logo3 from "../../static/3.jpeg";
import logo4 from "../../static/4.jpeg";
import logo5 from "../../static/5.jpeg";
import logo6 from "../../static/6.jpeg";
import logo7 from "../../static/7.jpeg";
import logo8 from "../../static/8.jpeg";
let logoarray = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
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
  const random = () => {
    const number = Math.floor(Math.random() * 8);
    return logoarray[number];
  };
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
                    style={{ marginTop: "1.4rem", marginRight: "1rem" }}
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
                      src={random()}
                      height="200px"
                      width="200px"
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
