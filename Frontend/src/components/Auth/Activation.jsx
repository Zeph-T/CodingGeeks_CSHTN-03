import React from "react";
import Button from "@material-ui/core/Button";
import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import httpService from "../../services/httpService";
import { api } from "../../utilities";
import "../../App.css";

class Activate extends React.Component {
  constructor(props, context) {
    super(props, context);
    let queryParams = new URLSearchParams(this.props.location.search);
    this.state = {
      activationToken: queryParams.has("activationToken")
        ? queryParams.get("activationToken")
        : null,
      error: false,
      verify: true,
    };
  }

  componentDidMount() {
    if (this.state.activationToken) {
      httpService
        .get(api.BASE_URL + api.ACTIVATE_USER + this.state.activationToken)
        .then((response) => {
          if (response.data.valid) {
            this.setState({ verify: false });
            this.props.history.push("/login");
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
        <div className="verticalCenterAligned">
          <h2> VERIFICATION SUCCESS </h2>
        </div>
      );
    }
  }
}

export default Activate;
