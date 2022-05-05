import React, { Component } from "react";
import { Link } from "react-router-dom";
import apartment from "../images/apartment2.jpg";
import apartmentMainView from "../images/apartment1.webp";
import bookworthy from "../images/bookworthy.jpg";

class LandingPage extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${bookworthy})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          {/*left Pane*/}
          <div className="col-md-3">
            <br />
            <hr />
            <Link to="/studentsignin">
              <button
                type="buttton"
                style={{ color: "rgb(184,115,51)" }}
                className="btn "
              >
                Student Sign In
              </button>
            </Link>
            <br />
            <hr />
            <Link to="/administratorsignin">
              <button
                type="buttton"
                style={{ color: "rgb(184,115,51)" }}
                className="btn "
              >
                Administrator Sign In
              </button>
            </Link>
            <br />
            <hr />
            <div
              className="section-detail"
              style={{ color: "rgb(184,115,51)" }}
            >
              <div className="card" style={{ margin: "15px" }}>
                <span style={{ height: "100%" }}>
                  Do It Efficiently
                  <hr />
                  Efficient Student Clearance
                </span>
              </div>
            </div>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">{/* feel this section */}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
