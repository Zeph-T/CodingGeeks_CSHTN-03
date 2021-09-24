import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { api } from "../../utilities";
import http from "../../services/httpService";
import { ReactComponent as NoData } from "../../static/nodata.svg";
import { LinearProgress } from "@material-ui/core";
import logo1 from "../../static/1.jpeg";
import logo2 from "../../static/2.jpeg";
import logo3 from "../../static/3.jpeg";
import logo4 from "../../static/4.jpeg";
import logo5 from "../../static/5.jpeg";
import logo6 from "../../static/6.jpeg";
import logo7 from "../../static/7.jpeg";
import logo8 from "../../static/8.jpeg";
let logoarray = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
function Search({ searchItem, match }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
   const random = () => {
     const number = Math.floor(Math.random() * 8);
     return logoarray[number];
   };
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
      resultData.push(...data.byManufacturer);
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
      <div style={{ alignItems: "center" }} className="nodata">
        <h2 className="nodata-text">
          No results found for search term <span style={{color:"red", fontWeight: 400}}> "{searchItem}" </span>
        </h2>
        <NoData height="400px" width="400px" />
      </div>
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
                alt="medicine"
                src={random()}
                height="220px"
                width="220px"
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
