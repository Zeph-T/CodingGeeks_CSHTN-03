import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Home from "./Home";
import Search from "../Search/Search";
import "../../App.css";
const SelectPage = ({ location }) => {
  const [searchItem, setQuery] = useState("");
  useEffect(() => {
    async function Start() {
      const query = queryString.parse(location.search);
      if(Object.keys(query).length !== 0)
        setQuery(query.search);
    }
    Start();
  }, []);
  if (!searchItem.length) {
    return  <Home />;
  }
  return <Search searchItem={searchItem}/>
};

export default SelectPage;
