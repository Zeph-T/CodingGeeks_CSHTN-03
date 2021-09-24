import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Slide,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Joi from "joi-browser";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signUp } from "../../services/api";
import useStyles from "./styles";
import Input from "../common/Input";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../static/logo.png";
import "../../App.css";
import WrappedButton from "../common/WrappedButton";
import httpService from "../../services/httpService";
import { api } from "../../utilities";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = (props) => {
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
    confirmPassword: Joi.string().required().label("Confirm Password"),
    name: Joi.string().min(3).required().label("Full Name"),
  };
    useEffect(() => {
      const jwt = localStorage.getItem("token");
      if (jwt) window.location = "/";
    }, []);
  const handleSubmit = async (event) => {
    setLoginIsInProgress(true);
    const options = { abortEarly: false };
    let errors = [];
    event.preventDefault();
    if (form.confirmPassword !== form.password) {
      errors.push("Passwords do not match.");
      setLoginIsInProgress(false);
    }
    const result = Joi.validate(form, schema, options);
    if (!result.error) {
      setErrors(errors);
    } else {
      event.preventDefault();
      for (let item of result.error.details) {
        errors.push(item.message);
      }
      setErrors(errors);
      setLoginIsInProgress(false);
    }
    if (errors.length > 0) return;
    event.preventDefault();
    httpService
      .post(api.BASE_URL + api.SIGNUP_URL, form)
      .then((response) => {
        if(response.data.error){
          props.openSnackBar(response.data.error);
        }else{
          props.openSnackBar(response.data.message);
        }
        setLoginIsInProgress(false);
      })
      .catch((err) => {
          props.openSnackBar(err.stack.message0);
          setLoginIsInProgress(false);
      });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="loginform">
      <ToastContainer />
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <img
              style={{ maxWidth: "10rem", width: "100%", textAlign: "right" }}
              src={Logo}
            />
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {errors.length !== 0 && (
              <Alert severity="error">{errors[0]} </Alert>
            )}
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Input
                  name="name"
                  label="Full Name"
                  handleChange={handleChange}
                  autoFocus
                />
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
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                />
                <WrappedButton
                  key="loginButton"
                  buttonKey="loginButton"
                  disabled={loginIsInProgress}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  name="Signup"
                  size="large"
                  style={{ width: "100%", margin: "0.5rem" }}
                  icon=""
                />
              </Grid>
              <Grid container justify="center">
                <Grid item>
                  <Button href="/login">
                    Already have an account? Sign in
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

export default Register;
