import React from "react";
import Button from "@material-ui/core/Button";
import { LinearProgress ,Typography , Slide,Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import httpService from "../../services/httpService";
import { api } from "../../utilities";
import WrappedButton from "../common/WrappedButton";
import "../../App.css";
import Input from "../common/Input";
import Logo from '../../static/logo.png'
import { Alert } from "@material-ui/lab";


class ResetPassword extends React.Component {
  constructor(props, context) {
    super(props, context);
    let queryParams = new URLSearchParams(this.props.location.search);
    this.state = {
      passwordResetToken: queryParams.has("passwordResetToken")
        ? queryParams.get("passwordResetToken")
        : null,
      error: false,
      verify: true,
      password : "",
      confirmPassword : "",
      progress: false,
      changePasswordInProgress : false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.passwordResetToken) {
      httpService
        .post(api.BASE_URL + api.VALIDATE_RESET_PASSWORD_TOKEN,{token : this.state.passwordResetToken})
        .then((response) => {
          if (response.data.isValid) {
            this.setState({ verify: false });
          } else {
            this.setState({ error: true, verify: false });
          }
        })
        .catch((err) => {
          this.setState({ error: true, verify: false });
        });
    } else {
      this.setState({ error: true, verify: false });
    }
  }

  handleChange(e){
      this.setState({ ...this.state, [e.target.name]: e.target.value });
  }
  handleSubmit(){
      if(this.state.password === this.state.confirmPassword){
        if(this.state.password.length < 8){
            this.props.openSnackBar('Password should be a minimum of 8 characters');
        }else{
            this.setState({progress : true});
            httpService.post(api.BASE_URL + api.RESET_PASSWORD , {password : this.state.password , token : this.state.passwordResetToken}).then(response=>{
                if(response.data.success){
                    window.location = 'login';
                }else{
                    this.props.openSnackBar('Error Occured');
                }
            }).catch(err=>{
                this.props.openSnackBar(err.message);
            })
            this.setState({progress : false});
        }
      }else{
        this.props.openSnackBar('Passwords do not match');
      }
  }
  render() {

    if (this.state.verify === true) {
      return (
        <div className="verticalCenterAligned">
          <h2>VERIFYING YOUR TOKEN</h2>
          {this.state.error === false ? <LinearProgress /> : null}
        </div>
      );
    } else if (this.state.error === true) {
      return (
        <div className="verticalCenterAligned">
          <h2>
            {" "}
            SOMETHING WENT WRONG WHILE VERIFYING YOUR TOKEN, PLEASE TRY AGAIN
            SOMETIME LATER{" "}
          </h2>
        </div>
      );
    } else {
      return (
<Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Container style={{marginTop : '20%',flexDirection : 'row'  , justifyContent : 'space-around'}} component="main" maxWidth="xs">
          <Typography component="h1" variant="h5" style={{textAlign : 'center',margin : '2rem'}}>
            RESET PASSWORD
          </Typography>
          {/* {this.state.errors.length !== 0 && <Alert severity="error">{this.state.errors[0]} </Alert>} */}
          <form  onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="password"
                label="new Passoword"
                handleChange={this.handleChange}
                type="text"
              />
              <Input
                name="confirmPassword"
                label="Confirm new Password"
                handleChange={this.handleChange}
                type="password"
              />
            </Grid>
            <WrappedButton
                  key="loginButton"
                  buttonKey="loginButton"
                  disabled={this.state.progress}
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  name="SET PASSWORD"
                  size="large"
                  style={{ width: "100%",marginTop : '1rem' }}
                  icon=""
                />
          </form>
      </Container>
      </Slide>
      );
    }
  }
}

export default ResetPassword;
