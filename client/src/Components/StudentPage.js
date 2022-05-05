import React, { Component } from "react";
import "../css/admin.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import bookworthy from "../images/bookworthy.jpg";
import StudentContent from "./StudentContent";
import { getFromStorage } from "../utils/storage";

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false,
      signedIn: true,
      isLoading: true,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    console.log("Component did mount");

    const obj = getFromStorage("Parcel_app");
    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      console.log(token);
      axios
        .get("http://localhost:5000/api/admin/verifystudent?token=" + token)
        .then((res) => {
          if (!res.data.success) {
            this.setState({
              logOut: true,
            });
          }

          console.log(this.state);
        });
    }
  }

  handleSignIn() {
    this.setState({
      signedIn: false,
    });
  }

  handleLogOut() {
    console.log("log out");
    const obj = getFromStorage("Parcel_app");
    const { token } = obj;
    axios
      .get("http://localhost:5000/api/student/studentlogout?token=" + token)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            logOut: true,
          });
        }
        console.log(res.data.message);
        this.setState({
          isLoading: false,
        });

        console.log(this.state.logOut);
      });
  }

  render() {
    const { logOut } = this.state;
    if (logOut) {
      return <p>{<Redirect to="/" />}</p>;
    }

    return (
      <div className="container">
        {/*left Pane*/}
        <div
          className="col-md-3"
          style={{
            backgroundImage: `url(${bookworthy})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: "rgb(184,115,51)",
            height: "100vh",
          }}
        >
          <button
            type="btn btn-primary"
            className="btn "
            onClick={this.handleLogOut}
            style={{ marginTop: "30px" }}
          >
            Log Out
          </button>

          <h2 className="section-detail">Student Clearance Panel</h2>
        </div>
        {/*right Pane*/}
        <div className="col-md-9">
          <div className="content-area">
            <StudentContent regNo={this.props.location.state.regNo} />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPage;
