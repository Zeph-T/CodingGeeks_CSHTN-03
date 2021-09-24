import React, { useState, useEffect } from "react";
import HeaderStyled from "./styled/HeaderStyle";
import "./Header.css";
import { api } from "../../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import logo from "../../static/logo.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import http from "../../services/httpService";
import DialogTitle from "@mui/material/DialogTitle";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
import Cart from "./Cart";
import httpService from "../../services/httpService";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import queryString from "query-string";
import Wishlist from "./Wishlist";

const stripePromise = loadStripe(
  "pk_test_51Iiee4SAPK4NnRb13KoXME97VtkAhUnA8X09Scub7ZhYE5lZwHzBfWCHKvDGRg5Yy4dxhwLmsPSl1B6n4q088tT3000EtpY0yV"
);
function Header(props) {
  const [open, setOpen] = useState(false);
  const [Logopen, setLogopen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageType, setImageType] = useState("");
  const query = queryString.parse(window.location.search);
    const [search, setSearch] = useState(query.search);
  const jwt = localStorage.getItem("token");
  const [cartOpen, setCartOpen] = useState(false)
  const [wishOpen, setwishOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [amount, setAmount] = useState(0);
  //var a = false;
  useEffect(() => {
    //  
    //  if (Object.keys(query).length !== 0 && a === false) setSearch(query.search);
    //   a = true;
    async function Start() {
      const { data } = await http.get(api.BASE_URL + api.GET_CART, {
        headers: { accesstoken: jwt },
      });
      setCart(data);
      const { data: wishlist_item } = await http.get(
        api.BASE_URL + api.GET_WISHLIST,
        {
          headers: { accesstoken: jwt },
        }
      );
      setWishlist(wishlist_item);
    }
    Start();
    if (url) {
      httpService
        .post("https://medzone-ml.herokuapp.com/getText", {
          image_url: url,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.error) {
            props.openSnackBar(
              "Error ocurred while analyzing the prescription"
            );
          } else {
            // fetch a backend route...jiska muje pata nahi hai
          }
        })
        .catch((err) => {
          console.log(err);
          props.openSnackBar("Error ocurred!");
        });
    }
  }, [cart, url]);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const imageStateUpdate = (event) => {
    setImage(event.target.files[0]);
    if (event.target.files) {
      setImageName(event.target.files[0].name);
      setImageType(event.target.files[0].type);
    }
  };

  const onClickCheckout = () => {
    setCartOpen(false);
    setPaymentOpen(true);
  };

  const handleCancelDialog = (event) => {
    handleClose();
    setImage("");
  };

  const postDetails = () => {
    if (imageType.includes("image")) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Instafam");
      data.append("cloud_name", "abcd1234huy");
      fetch("https://api.cloudinary.com/v1_1/abcd1234huy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          setOpen(false);
          // console.log(url);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      props.openSnackBar("The Upload type should be an image!");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (search && !search.length) window.location = "/";
      else window.location = `/?search=${search}`;
    }
  };
  return (
    <div>
      <div className="header_wraper">
        <HeaderStyled>
          <div className="left-items" style={{ padding: "2px 5px" }}>
            <img src={logo} className="brand_logo" width="80px" height="80px" />
            <Button
              style={{ marginLeft: "2rem" }}
              color="inherit"
              variant="outlined"
              onClick={handleClickOpen}
            >
              <FontAwesomeIcon
                style={{ fontSize: "1.7rem" }}
                icon={faUpload}
                size="lg"
              />
              Upload Prescription
            </Button>
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
                <a className='link' href='/profile'>
                  Profile
                </a>
              </div>
              <div>
                <div className="link">
                  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                </div>
                <a className="link" onClick={() => setCartOpen(!cartOpen)}>
                  Cart
                </a>
              </div>
              <div>
                <div className="link">
                  <i class="fa fa-bookmark fa-lg" aria-hidden="true"></i>
                </div>
                <a className="link" onClick={() => setwishOpen(!wishOpen)}>
                  Wishlist
                </a>
              </div>
              <div>
                <div className="link">
                  <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i>
                </div>
                <a className="link" onClick={() => setLogopen(true)}>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </HeaderStyled>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Prescription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can upload any prescription in image format, we will fetch the
            required medications mentioned in your prescription and get them
            added to your cart!
          </DialogContentText>
          <label htmlFor="upload-photo" style={{ margin: "0.5rem 12rem" }}>
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={(e) => imageStateUpdate(e)}
            />
            <Fab
              color="secondary"
              size="medium"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon style={{ margin: "4px" }} />{" "}
              <Typography style={{ fontWeight: "600" }} variant="caption">
                Add a prescription{" "}
              </Typography>
            </Fab>
          </label>
          <div>
            {image && <Typography variant="body1"> {imageName} </Typography>}
          </div>
          {/* {console.log(imageName)} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelDialog()}>Cancel</Button>
          <Button onClick={() => postDetails()}>Upload</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={paymentOpen}>
        <DialogContent>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={amount} cart={cart} openSnackBar={props.openSnackBar} />
            </Elements>
          </div>
        </DialogContent>
      </Dialog>
      <Cart
        cart={cart}
        cartOpen={cartOpen}
        onClickCheckout={onClickCheckout}
        setCartOpen={setCartOpen}
        setAmount={setAmount}
      />
      <Wishlist
        wishlist={wishlist}
        wishOpen={wishOpen}
        setwishOpen={setwishOpen}
      />
      <Dialog
        open={Logopen}
        onClose={() => setLogopen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to logout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setLogopen(false)}>No</Button>
          <Button onClick={() => setLogopen(false)} autoFocus>
            <a href="/logout">Yes</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// function CheckoutForm() {
//   const [isPaymentLoading, setPaymentLoading] = useState(false);
//   // const stripe = useStripe();
//   const elements = useElements();
//   const payMoney = async (e) => {
//     const token = await stripe.tokens.create({
//       card: elements.getElement(CardElement)
//     })
//     console.log(token);
//     console.log("token recived");
//     // const token = await stripe.tokens.create({
//     //   card: {
//     //     number: '4242424242424242',
//     //     exp_month: 9,
//     //     exp_year: 2022,
//     //     cvc: '314',
//     //   },
//     // });
//     // e.preventDefault();
//     // if (!stripe || !elements) {
//     //   return;
//     // }
//     // setPaymentLoading(true);
//     // const clientSecret = getClientSecret();
//     // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//     //   payment_method: {
//     //     card: elements.getElement(CardElement),
//     //     billing_details: {
//     //       name: "Faruq Yusuff",
//     //     },
//     //   },
//     // });
//     // setPaymentLoading(false);
//     // if (paymentResult.error) {
//     //   alert(paymentResult.error.message);
//     // } else {
//     //   if (paymentResult.paymentIntent.status === "succeeded") {
//     //     alert("Success!");
//     //   }
//     // }
//   };

//   return (
//     <div
//       style={{
//         padding: "3rem",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "500px",
//           margin: "0 auto",
//         }}
//       >
//         <form
//           style={{
//             display: "block",
//             width: "100%",
//           }}
//           onSubmit = {payMoney}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <CardElement
//               className="card"
//               options={{
//                 style: {
//                   base: {
//                     width : '100%'
//                   }
//                 },
//               }}
//             />
//             <button
//               className="pay-button"
//               disabled={isPaymentLoading}
//               onClick={payMoney}
//             >
//               {isPaymentLoading ? "Loading..." : "Pay"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

export default Header;
