import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { api } from "../../utilities";
import http from "../../services/httpService";
import { LinearProgress } from "@material-ui/core";

function Search({ searchItem, match }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function Start() {
      console.log(searchItem);
      const jwt = localStorage.getItem("token");
      console.log(api.BASE_URL + api.GET_SEARCH_ITEMS + "search=" + searchItem);
      const { data } = await http.get(
        api.BASE_URL + api.GET_SEARCH_ITEMS + "search=" + searchItem,
        {
          headers: { accesstoken: jwt },
        }
      );
      let resultData = [];
      resultData.push(...data.byCategory);
      resultData.push(...data.byText);
      setResults(resultData);
      setLoading(false);
    }
    Start();
  }, []);
  if (loading === true) {
    return (
      <div className="verticalCenterAligned">
        <h2>Loading Search Results</h2>
        <LinearProgress color="secondary" />
      </div>
    );
  } else if (results.length == 0) {
    return (

    );
  }
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
                <a className="price-home" href={"/product/" + product._id}>
                  {product.name}, {product.type}
                </a>
                <p className="product-manuf">By {product.manufacturer}</p>
                <hr />
                <p>
                  Price: <span className="price">&#x20b9; {product.cost}</span>
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
