import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Joi from "joi-browser";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import useStyles from "./styles";
import Input from "../common/Input";
import { signIn } from "../../services/api";
import { Link } from 'react-router-dom';

const initialState = { email: "", password: "" };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
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
    if (errors.length > 0) return;
    event.preventDefault();
    // calling backend services
    try {
      localStorage.removeItem("isActivated");
      const { data: jwt }  = await signIn(form);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response) {
        toast.error(ex.response.data);
      }
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Button>
                  <Link to="/register">Don't have an account? Sign Up</Link>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;