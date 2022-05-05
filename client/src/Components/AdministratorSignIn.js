import React, { Component } from "react";
import "../css/signIn.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setInStorage } from "../utils/storage";
import signinapartment from "../images/apartment4.jpg";
import bookworthy from "../images/bookworthy.jpg";

class AdministratorSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminId: "",
      password: "",
      role: "registry",
      signInError: "",
      signedIn: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAdminIdChange = this.handleAdminIdChange.bind(this);

    this.submitData = this.submitData.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleAdminIdChange(event) {
    this.setState({
      adminId: event.target.value,
    });
  }

  submitData(event) {
    event.preventDefault();
    const { adminId, password, role } = this.state;

    const data = {
      adminId,
      role,
      password,
    };

    axios
      .post("http://localhost:5000/api/admin/adminsignin", data)
      .then((res) => {
        const { success, message, token } = res.data;
        if (!success) {
          return this.setState({
            signInError: message,
          });
        }
        setInStorage("Parcel_app", { token: token });
        this.setState({
          signedIn: true,
          password: "",
        });
      });

    console.log(this.state);
  }

  render() {
    const { password, signedIn, signInError } = this.state;
    if (signedIn) {
      //remainder:change signedIn state back to false
      return (
        <Redirect
          to={{
            pathname: "/admin",
            state: {
              role: this.state.role,
            },
          }}
        />
      );
    }
    return (
      <div
        style={{
          backgroundImage: `url(${bookworthy})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div
          className="container"
          style={{
            color: "white",
            borderRadius: "0px",
            paddingTop: "120px",
            color: "rgb(184,115,51)",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Sign In</h1>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <br />
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="adminId"
                  aria-describedby="helpId"
                  onChange={this.handleAdminIdChange}
                />
                <small
                  id="helpId"
                  className="form-text text-muted"
                  style={{ color: "white" }}
                >
                  admin Id
                </small>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="password"
                  onChange={this.handlePasswordChange}
                />
                <small
                  id="passwordHelpId"
                  className="form-text text-muted"
                  style={{ color: "white" }}
                >
                  Password
                </small>
                <br />
                <br />
                <select
                  class="form-control form-control-sm"
                  onChange={(event) => {
                    this.setState({
                      role: event.target.value,
                    });
                  }}
                >
                  <option value="registry">registry</option>
                  <option value="librarian">librarian</option>
                  <option value="finance">finance</option>
                  <option value="games"> games</option>
                </select>
                <small
                  id="helpId"
                  className="form-text "
                  style={{ color: "white" }}
                >
                  Select Role
                </small>
                <br />
                <div className="form-group">
                  {signInError ? (
                    <div
                      class="alert alert-danger"
                      style={{ color: "rgb(184,115,51)" }}
                    >
                      {signInError}
                    </div>
                  ) : null}

                  <div className="col-md-4"></div>
                </div>
                <br />
                <button
                  type="submit"
                  style={{ marginTop: 10, color: "rgb(184,115,51)" }}
                  className="btn "
                  onClick={this.submitData}
                >
                  Submit
                </button>
                <br />
                <strong>
                  If do not have an account check with administrator
                </strong>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdministratorSignIn;
