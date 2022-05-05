import React, { Component } from "react";
import axios from "axios";

class FinanceTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentData: [],

      //Specific data to be updated
      regNo: "",
      name: "",
      feesRequired: "",
      feesPaid: 0,
      balance: 0,
      updated: false,
    };

    this.updateModal = this.updateModal.bind(this);
    this.groupButtons = this.groupButtons.bind(this);
    this.setDataToUpdate = this.setDataToUpdate.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/admin/getfeesrecords").then((res) => {
      console.log(res.data);
      if (res.data.success == false) {
        return this.setState({
          message: res.data.message,
        });
      }

      this.setState({
        studentData: res.data,
      });

      console.log(this.state.userData);
    });
  }

  groupButtons = (regNo) => {
    return (
      <div className="btn-group">
        {this.updateModal()}
        <button
          type="button"
          className="btn btn-default"
          data-toggle="modal"
          data-target="#updatemodal"
          onClick={() => this.setDataToUpdate(regNo)}
        >
          Update
        </button>
      </div>
    );
  };

  setDataToUpdate = (regNo) => {
    axios
      .get(
        "http://localhost:5000/api/admin/getspecificfeesrecord?regNo=" + regNo
      )
      .then((res) => {
        res.data.map((student) => {
          this.setState({
            regNo: student.regNo,
            name: student.name,
            feesRequired: student.feesRequired,
            feesPaid: student.feesPaid,
            balance: student.balance,
          });
        });
      });
  };

  updateModal = () => {
    return (
      <div>
        <div
          class="modal fade"
          id="updatemodal"
          tabindex="3"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Update Record
                </h4>
              </div>
              <div class="modal-body ">
                <div>
                  <form class="bs-example bs-example-form" role="form">
                    <div class="input-group"></div>

                    <label>Fees Required</label>
                    <div class="input-group">
                      <span class="input-group-addon">Ksh</span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="feesRequired"
                        value={this.state.feesRequired}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">.00</span>
                    </div>
                    <br />
                    <label>Fees Paid</label>
                    <div class="input-group">
                      <span class="input-group-addon">Ksh</span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="feesPaid"
                        value={this.state.feesPaid}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">.00</span>
                    </div>
                    <br />
                    <label>Balance</label>
                    <div class="input-group">
                      <span class="input-group-addon">Ksh</span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="balance"
                        value={this.state.balance}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">.00</span>
                    </div>
                    <br />
                    <div className="input-group"></div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-primary"
                    onClick={() => this.updateRecord()}
                  >
                    update Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateRecord = () => {
    const data = this.state;
    return axios
      .patch("http://localhost:5000/api/admin/updatefeesrecords", data)
      .then(
        this.setState({
          updated: true,
        })
      );
  };

  render() {
    //set code to update table once updated
    if (this.state.updated == true) {
      axios
        .get("http://localhost:5000/api/admin/getfeesrecords")
        .then((res) => {
          this.state.cars = res.data.map((data) => data);
          this.setState({
            studentData: res.data,
            updated: false,
          });
        });
    }

    //style the table
    const styleTable = {
      padding: 80,
      color: "rgb(184, 115, 51)",
    };

    const studentData = this.state.studentData;
    const searchedItem = this.props.searchedItem;
    return (
      <div style={styleTable}>
        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>Registration Number </th>
              <th>Name</th>
              <th>Fees Required</th>
              <th>Fees Paid</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {studentData
              .filter((student) =>
                student.regNo.toLowerCase().includes(searchedItem.toLowerCase())
              )
              .map((student) => {
                return (
                  <tr>
                    <td>{student.regNo}</td>
                    <td>{student.name}</td>
                    <td>{student.feesRequired}</td>
                    <td>{student.feesPaid}</td>
                    <td>{student.balance}</td>
                    <td>{this.groupButtons(student.regNo)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FinanceTable;
