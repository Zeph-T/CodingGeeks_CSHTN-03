import HeaderStyled from "./styled/HeaderStyle";
import PictureLink from "./styled/PictureLink";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../static/logo.png";
import React, {useState} from "react";

function Header() {
  const [search, setSearch] = useState("");
  const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (!search.length) window.location = '/';
        else window.location = `/?search=${search}`
      }
  };
  return (
    <div className="header_wraper">
      <HeaderStyled>
        <div className="left-items">
          <img src={logo} className="brand_logo" width="80px" height="80px" />
          {/* <NavLink className="nav_link">MEN</NavLink>
          <NavLink className="nav_link">WOMEN</NavLink>
          <NavLink className="nav_link">KIDS</NavLink>
          <NavLink className="nav_link">LIFESTYLE</NavLink>
          <NavLink className="nav_link">DISCOVER</NavLink> */}
        </div>
        <div className="right-items">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for medicines, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="profile-links">
            <div>
              <div className="link">
                <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
              </div>
              <a className="link" href="/me">
                Profile
              </a>
            </div>
            <div>
              <div className="link">
                <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
              </div>
              <a className="link" href="/cart">
                Cart
              </a>
            </div>
            <div>
              <div className="link">
                <i class="fa fa-bookmark fa-lg" aria-hidden="true"></i>
              </div>
              <a className="link" href="/wishlist">
                Wishlist
              </a>
            </div>
            <div>
              <div className="link">
                <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i>
              </div>
              <a className="link" href="/logout">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </HeaderStyled>
    </div>
  );
}

export default Header;
