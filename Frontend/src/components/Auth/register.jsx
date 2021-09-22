import React, { useState } from 'react';
import { Avatar,  Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import Joi from "joi-browser";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signUp } from "../../services/api";
import useStyles from './styles';
import Input from '../common/Input';
import { ToastContainer, toast } from 'react-toastify';


const initialState = { name: '', email: '', password: '', mobile: '', confirmPassword: '' };

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().min(6).label("Password"),
    confirmPassword: Joi.string().required().label("Confirm Password"),
    name: Joi.string().min(3).required().label("Full Name"),
    mobile: Joi.string().label("Mobile Number"),
  };
  const handleSubmit = async (event) => {
    const options = { abortEarly: false };
    let errors = [];
    event.preventDefault();
    if (form.confirmPassword !== form.password) errors.push("Passwords do not match.");
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
    try {
      await signUp(form);
      window.location = '/login';
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
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
    </div>
  );
};

export default Register;