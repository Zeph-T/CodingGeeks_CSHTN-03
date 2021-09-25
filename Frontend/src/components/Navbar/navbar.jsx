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
import { CircularProgress } from "@material-ui/core";
import PrescriptionResult from "./PrescriptionResults";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
  const [prescription, setPrescription] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acitivtyText, setActivityText] = useState("");

  useEffect(() => {
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
      setActivityText("Extracting Medicines from the Prescription")
      httpService
        .post(api.ML_MODEL_API_LOCALHOST, {
          image_url: url,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.error) {
            props.openSnackBar(
              "Error ocurred while analyzing the prescription"
            );
            setLoading(false);
            setUrl(null);
          } else {
            console.log(response);
            setUrl(null);
            setActivityText("Getting Medicines from the Database");
            httpService.post(api.BASE_URL + api.GET_EXTRACTED_ITEMS, {
              words: response.data.result,
            },{headers: { accesstoken: jwt }}
            )
            .then((response)=> {
              if(response.error){
                props.openSnackBar(
                  "Error ocurred while fetching results from backend"
                );
                setLoading(false);
              }
              else {
                console.log(response);
                setPrescription(response.data);
                setLoading(false);
              }
              setActivityText("");
            })
          }
        })
        .catch((err) => {
          console.log(err);
          props.openSnackBar("Error ocurred while connecting to the model");
          setUrl(null);
          setLoading(false);
        });
    }
  }, [url]);
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
    setPrescription([]);
  };

  const postDetails = () => {
    if (imageType.includes("image")) {
      setLoading(true);
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
            <a href='/'><img src={logo} className="brand_logo" width="100px" height="100px" /></a>
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
      <Dialog open={open} onClose={handleClose} maxWidth='md'>
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
            <div style={{display : 'flex',flexDirection : 'column',alignItems : 'center' , justifyContent : 'center'}}>
            {loading && <CircularProgress />}
            <br />
            {loading && <Typography variant="body1"> {acitivtyText} </Typography>}
            </div>
          </div>
          {/* {console.log(imageName)} */}
          {prescription.length>0 && <PrescriptionResult results={prescription} {...props} />}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelDialog()}>Cancel</Button>
          <Button onClick={() => postDetails()}>Upload</Button>
        </DialogActions>
        
      </Dialog>
      <Dialog fullWidth open={paymentOpen}>
      <IconButton style={{marginLeft: '35rem'}} onClick={()=> setPaymentOpen(false)}><CloseIcon /></IconButton>
        <DialogContent>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm setPaymentOpen={setPaymentOpen} openSnackBar={props.openSnackBar} amount={amount} cart={cart} openSnackBar={props.openSnackBar} />
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
        setCart={setCart}
      />
      <Wishlist
        wishlist={wishlist}
        wishOpen={wishOpen}
        setwishOpen={setwishOpen}
        setWishlist={setWishlist}
        openSnackBar={props.openSnackBar}
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


export default Header;
