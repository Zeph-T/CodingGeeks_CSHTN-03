import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Home from "./Home";
import Search from "../Search/Search";
import "../../App.css";
const SelectPage = (props) => {
  const [searchItem, setQuery] = useState("");
  useEffect(() => {
    async function Start() {
      const query = queryString.parse(props.location.search);
      if(Object.keys(query).length !== 0)
        setQuery(query.search);
    }
    Start();
  }, []);
  if (!searchItem.length) {
    return  <Home {...props} />;
  }
  return <Search {...props} searchItem={searchItem}/>
};

export default SelectPage;
