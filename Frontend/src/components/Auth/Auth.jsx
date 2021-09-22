import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Slide
} from "@material-ui/core";
import Joi from "joi-browser";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import useStyles from "./styles";
import Input from "../common/Input";
import { signUp } from "../../services/api";
import WrappedButton from "../common/WrappedButton";
import Logo from '../../static/logo.png'
import "../../App.css"
import httpService from "../../services/httpService";
import { api } from "../../utilities";
const initialState = { email: "", password: "" };

const SignUp = (props) => {
  const [form, setForm] = useState(initialState);
  const [loginIsInProgress, setLoginIsInProgress] = useState(false);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();
  const schema = {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required().min(6).label("Password"),
  };

  // function to be on submission of a form
  const handleSubmit = async (event) => {
    setLoginIsInProgress(true);
    const options = { abortEarly: false };
    // finding errors
    let errors = [];
    event.preventDefault();
    const result = Joi.validate(form, schema, options);
    if (!result.error) {
      setErrors(errors);
    } else {
      event.preventDefault();
      for (let item of result.error.details) {
        errors.push(item.message);
      }  
      setErrors(errors);
    }
    if (errors.length > 0) {
      setLoginIsInProgress(false);
      return;
    }
    event.preventDefault();
    // calling backend services
    try {
      httpService.post(api.BASE_URL + api.LOGIN_URL,form).then(response=>{
        if(response.data.error){
          props.openSnackBar(response.data.error)
        }else{
          localStorage.removeItem('isActivated');
          localStorage.setItem("token",response.data.token);
          window.location = '/';
        }
        setLoginIsInProgress(false);
      }).catch(err=>{
        props.openSnackBar(err);
        setLoginIsInProgress(false);
      })
    } catch (ex) {
      if (ex.response) {
        toast.error(ex.response.data);
      }
      setLoginIsInProgress(false);
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div className="loginform">
      <ToastContainer />
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
        <img style={{maxWidth : '10rem' , width : '100%' , textAlign : 'right'}} src={Logo} />
          <Typography component="h1" variant="h5">
            Sign   In
          </Typography>
          {errors.length !== 0 && <Alert severity="error">{errors[0]} </Alert>}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type="password"
              />
            </Grid>
            <WrappedButton
                  key="loginButton"
                  buttonKey="loginButton"
                  disabled={loginIsInProgress}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  name="Login"
                  size="large"
                  style={{ width: "100%",marginTop : '1rem' }}
                  icon=""
                />
            <Grid container justify="center">
              <Grid item>
              <Button href="/register">
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      </Slide>
    </div>
  );
};

export default SignUp;