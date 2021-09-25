import "./styles.css";
import { useState, useEffect } from "react";
import image from "./download.jpeg";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Paper, Container, LinearProgress } from "@material-ui/core";
import WrappedButton from "../common/WrappedButton";
import httpService from "../../services/httpService";
import { ReactComponent as NoData } from "../../static/nodata.svg";
import { api } from "../../utilities";
import { TextField } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo1 from "../../static/1.jpeg";
import logo2 from "../../static/2.jpeg";
import logo3 from "../../static/3.jpeg";
import logo4 from "../../static/4.jpeg";
import logo5 from "../../static/5.jpeg";
import logo6 from "../../static/6.jpeg";
import logo7 from "../../static/7.jpeg";
import logo8 from "../../static/8.jpeg";
let logoarray = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

const jwt = localStorage.getItem("token");

function Profile(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  //   const [buttonSelected, setbuttonSelected] = useState('profile');
  const [progress, setProgress] = useState(false);
  // const data = props.user
  const random = () => {
    const number = Math.floor(Math.random() * 8);
    return logoarray[number];
  };
  const [products, setProducts] = useState([]);
  let resetPassword = () => {
    setProgress(true);
    httpService
      .post(api.BASE_URL + api.FORGOT_PASSWORD, { email: props.user.email })
      .then((response) => {
        if (response.data.status) {
          props.openSnackBar(response.data.status);
          setProgress(false);
        } else {
          setProgress(false);
        }
      })
      .catch((err) => {
        setProgress(false);
        props.openSnackBar(err);
      });
  };
  useEffect(() => {
    function orderHandler() {
      httpService
        .get(api.BASE_URL + api.GET_PAST_ORDERS, {
          headers: { accesstoken: jwt },
        })
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.orders);
          } else {
            props.openSnackBar("Error making payment");
          }
        })
        .catch((err) => {
          props.openSnackBar(err);
        });
    }
    orderHandler();
  }, []);

  return (
    <div class="cotainer" style={{padding:'1rem'}}>
      <div className="row ">
        <div className="col-3">
          <div>
            <div className="animated fadeIn" key={props.user.id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar" style={{ alignItems: "center" }}>
                    <img
                      src={image}
                      style={{ width: "100px" }}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {props.user.name}
                  </h5>
                  <div style={{ textAlign: "center" }}>
                    <p className="card-text"> Username : {props.user.name} </p>
                    <p className="card-text">Email : {props.user.email}</p>
                    <br />
                    <WrappedButton
                      name="Reset Password"
                      disabled={progress}
                      color="primary"
                      variant="outlined"
                      onClick={resetPassword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="animated fadeIn" key={props.user._id}>
            <div className="card pro-cart">
              <div className="card-body">
                {products.length == 0 && (
                  <NoData
                    height="400px"
                    width="400px"
                    className="nodata-pro"
                    style={{ alignItems: "center" }}
                  />
                )}
                
                {products &&
                  products.map((product) => (
                    <div className="mt-2" >
                      <Container component="main" maxWidth="xl">
                        <Paper className="" elevation={3}>
                          <div class="d-flex justify-content-between">
                            <h3
                              className="category-head"
                              style={{ marginTop: "1rem" }}
                            >
                              Transaction Id :{product.transactionId}
                            </h3>
                          </div>
                          <hr />
                          <div className="row d-flex justify-content-between" style={{padding:'3rem'}}>
                          <Slider {...settings}>
                            {product.items.map((item) => (
                              <div className="col p-1 m-8 prod-info-home" style={{width:'50rem', height:'300px'}}>
                                <img
                                  className="prod-img-home"
                                  alt="medicine"
                                  src={random()}
                                  width='auto'
                                  height='auto'
                                />
                                <a
                                  className="price-home"
                                  href={"/product/" + item.item._id}
                                >
                                  {item.item.name}
                                </a>
                                <p className="product-manuf">
                                  By {item.item.manufacturer}
                                </p>
                                <hr />
                                <p>
                                  Price:{" "}
                                  <span className="price">
                                    &#x20b9; {item.item.cost}
                                  </span>
                                </p>
                              </div>
                            ))}
                         
                            </Slider>
                          </div>
                        </Paper>
                      </Container>
                    </div>
                  ))}
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
