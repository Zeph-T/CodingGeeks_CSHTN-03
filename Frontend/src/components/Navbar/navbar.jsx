import React, { useState, useEffect } from "react";
import HeaderStyled from "./styled/HeaderStyle";
import PictureLink from "./styled/PictureLink";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import logo from "../../static/logo.png";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";



function Header(props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [imageName, setImageName] = useState("");
  const [imageType, setImageType] = useState("");

  useEffect(() => {
    if (url) {
      fetch("https://medzone-ml.herokuapp.com/getText", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: url,
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.error) {
            props.openSnackBar("Error ocurred while analyzing the prescription")
          }
          else {
           // fetch a backend route...jiska muje pata nahi hai
          }
        }).catch(err => {
          console.log(err)
          props.openSnackBar("Error ocurred!")
        })

    }
  }, [url])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageStateUpdate = (event) => {
    console.log(event)
    setImage(event.target.files[0])
    if (event.target.files) {
      setImageName(event.target.files[0].name)
      setImageType(event.target.files[0].type)
    }

  }

  const handleCancelDialog = (event) => {
    handleClose();
    setImage('');
  }


  const postDetails = () => {
    if (imageType.includes('image')) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "Instafam")
      data.append("cloud_name", "abcd1234huy")
      fetch("https://api.cloudinary.com/v1_1/abcd1234huy/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          setUrl(data.url)
          setOpen(false);
          console.log(url);
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      props.openSnackBar("The Upload type should be an image!")
    }


  }
  return (
    <div>
      <div className="header_wraper">
        <HeaderStyled>
          <div className="left-items" style={{ padding: '2px 5px' }}>
            <img src={logo} className="brand_logo" width="80px" height="80px" />
            <Button color='inherit' variant="outlined" onClick={handleClickOpen}>
              <FontAwesomeIcon style={{ fontSize: '1.7rem' }} icon={faUpload} size="lg" />
              Upload Prescription
            </Button>

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
            />
            <div className="profile-links">
              <div>
                <div className="link">
                  <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                </div>
                <a className="link" href="/me">Profile</a>
              </div>
              <div>
                <div className="link">
                  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                </div>
                <a className="link" href="/cart">Cart</a>
              </div>
              <div>
                <div className="link">
                  <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i>
                </div>
                <a className="link" href="/logout">Sign Out</a>
              </div>
            </div>
          </div>
        </HeaderStyled>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Prescription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can upload any prescription in image format, we will fetch the required medications mentioned in your prescription and get them added to your cart!
          </DialogContentText>
          <label htmlFor="upload-photo" style={{ margin: '0.5rem 12rem' }}>
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
              <AddIcon style={{ margin: '4px' }} /> <Typography style={{ fontWeight: '600' }} variant='caption'>Add a prescription </Typography>
            </Fab>

          </label>
          <div>{image && <Typography variant='body1'> {imageName} </Typography>}</div>
          {console.log(imageName)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelDialog()}>Cancel</Button>
          <Button onClick={() => postDetails()}>Upload!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
