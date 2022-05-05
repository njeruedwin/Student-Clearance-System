import React, { Component } from "react";
import axios from "axios";

export class StudentContent extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
    this.state = {
      currentDate: date,
      libraryBalance: 0,
      gamesBalance: 0,
      feesBalance: 0,
      cleared: Boolean,
      clearError: "",
    };

    //this.checkRegistry = this.checkRegistry.bind(this);
    this.checkIfCleared = this.checkIfCleared.bind(this);
    this.checkLibrary = this.checkLibrary.bind(this);
    this.checkFinance = this.checkFinance.bind(this);
    this.checkGames = this.checkGames.bind(this);
    this.clearStudent = this.clearStudent.bind(this);
  }

  componentDidMount() {
    const regNo = this.props.regNo;
    this.checkIfCleared(regNo);
    this.checkLibrary(regNo);
    this.checkFinance(regNo);
    this.checkGames(regNo);
  }

  checkIfCleared = (regNo) => {
    axios
      .get("http://localhost:5000/api/admin/getspecificstudent?regNo=" + regNo)
      .then((res) => {
        this.setState({
          cleared: res.data[0].cleared,
        });
        console.log(res.data[0].cleared);
      });
  };

  checkLibrary = (regNo) => {
    axios
      .get(
        "http://localhost:5000/api/admin/getspecificlibraryrecord?regNo=" +
          regNo
      )
      .then((res) => {
        this.setState({
          libraryBalance: res.data[0].balance,
        });
      });
  };

  checkGames = (regNo) => {
    axios
      .get(
        "http://localhost:5000/api/admin/getspecificgamesrecord?regNo=" + regNo
      )
      .then((res) => {
        this.setState({
          gamesBalance: res.data[0].balance,
        });
      });
  };

  checkFinance = (regNo) => {
    axios
      .get(
        "http://localhost:5000/api/admin/getspecificfeesrecord?regNo=" + regNo
      )
      .then((res) => {
        this.setState({
          feesBalance: res.data[0].balance,
        });
      });
  };

  clearStudent = () => {
    this.componentDidMount();
    const { libraryBalance, gamesBalance, feesBalance } = this.state;
    if (libraryBalance <= 0 && feesBalance <= 0 && gamesBalance <= 0) {
      const data = { regNo: this.props.regNo, cleared: true };
      axios
        .patch("http://localhost:5000/api/admin/clearstudent", data)
        .then((res) => {
          this.setState({
            cleared: true,
          });
        });
    } else {
      this.setState({
        clearError:
          "Cannot clear with the Department. Their are pending Charges",
      });
    }
  };

  render() {
    const regNo = this.props.regNo;
    const { clearError, currentDate } = this.state;
    console.log(this.state);
    return (
      <div style={{ color: "rgb(184,115,51)" }}>
        Registration Number: {regNo}
        <h1>
          Student is{" "}
          {this.state.cleared ? (
            <span style={{ color: "green" }}>Cleared</span>
          ) : (
            <span style={{ color: "red" }}>Not Cleared</span>
          )}
        </h1>
        {}
        {clearError ? (
          <div class="alert alert-danger" style={{ color: "rgb(184,115,51)" }}>
            {clearError}
          </div>
        ) : null}
        <button
          className="btn btn-default"
          style={{
            color: "rgb(184,115,51)",
            width: "20rem",
            marginBottom: "20px",
          }}
          onClick={this.clearStudent}
        >
          {" "}
          Clear With The Chairman{" "}
        </button>
        <br />
        <table class="table table-striped table-inverse table-responsive">
          <tbody>
            <tr>
              <td scope="row"> Chairman Of Department</td>
              <td>
                <div class="list-group">
                  <a class="list-group-item list-group-item-action ">
                    cleared/Not cleared :{" "}
                    {this.state.cleared ? (
                      <span style={{ color: "green" }}> Cleared </span>
                    ) : (
                      <span style={{ color: "red" }}> Not Cleared </span>
                    )}
                  </a>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row">
                {" "}
                Library
                <br /> Remarks:{" "}
                {this.state.libraryBalance <= 0
                  ? "Their are no Library Fees"
                  : "The Library fees is yet to be cleared"}{" "}
              </td>
              <td>
                <div class="list-group">
                  <a class="list-group-item list-group-item-action ">
                    Charges : Ksh. {this.state.libraryBalance}
                  </a>
                  <a class="list-group-item list-group-item-action">
                    Date: {currentDate}{" "}
                  </a>
                  <a class="list-group-item list-group-item-action ">
                    cleared/Not cleared:
                    {this.state.libraryBalance <= 0 ? (
                      <span style={{ color: "green" }}> Cleared </span>
                    ) : (
                      <span style={{ color: "red" }}> Not Cleared </span>
                    )}
                  </a>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row">
                {" "}
                Student Finance Office
                <br /> Remarks:{" "}
                {this.state.feesBalance <= 0
                  ? "Their is no fee balance"
                  : "The fee is yet to be cleared"}{" "}
              </td>
              <td>
                <div class="list-group">
                  <a class="list-group-item list-group-item-action ">
                    Charges : Ksh. {this.state.feesBalance}
                  </a>
                  <a class="list-group-item list-group-item-action">
                    Date: {currentDate}{" "}
                  </a>
                  <a class="list-group-item list-group-item-action ">
                    cleared/Not cleared:{" "}
                    {this.state.feesBalance <= 0 ? (
                      <span style={{ color: "green" }}> Cleared </span>
                    ) : (
                      <span style={{ color: "red" }}> Not Cleared </span>
                    )}
                  </a>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td scope="row">
                {" "}
                Sports And Games <br /> Remarks:{" "}
                {this.state.gamesBalance <= 0
                  ? "Their are no sports and games Charges"
                  : "The Games charges is yet to be cleared"}{" "}
              </td>
              <td>
                <div class="list-group">
                  <a class="list-group-item list-group-item-action ">
                    Charges : Ksh. {this.state.gamesBalance}
                  </a>
                  <a class="list-group-item list-group-item-action">
                    Date: {currentDate}
                  </a>
                  <a class="list-group-item list-group-item-action ">
                    cleared/Not cleared:
                    {this.state.gamesBalance <= 0 ? (
                      <span style={{ color: "green" }}> Cleared </span>
                    ) : (
                      <span style={{ color: "red" }}> Not Cleared </span>
                    )}
                  </a>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentContent;
