import React, { Component } from "react";
import axios from "axios";

class RegistryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentData: [],

      //new student data
      regNo: "",
      name: "",
      course: "",
      password: "",
      updated: false,
    };

    this.newStudentModal = this.newStudentModal.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.createRecord = this.createRecord.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/admin/getstudents").then((res) => {
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

  newStudentModal = () => {
    return (
      <div>
        <div
          class="modal fade"
          id="newStudentModal"
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
                  Add New Student
                </h4>
              </div>
              <div class="modal-body ">
                <div>
                  <form class="bs-example bs-example-form" role="form">
                    <div class="input-group"></div>

                    <label>Registration Number</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="regNo"
                        onChange={this.updateValue}
                      />
                    </div>
                    <br />
                    <label>Name</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="name"
                        onChange={this.updateValue}
                      />
                    </div>
                    <br />
                    <label>course</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="course"
                        onChange={this.updateValue}
                      />
                    </div>
                    <br />
                    <label>password</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="..."
                        name="password"
                        onChange={this.updateValue}
                      />
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
                    onClick={() => this.createRecord()}
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

  createRecord = () => {
    const data = this.state;
    return axios
      .post("http://localhost:5000/api/admin/createstudent", data)
      .then(
        this.setState({
          updated: true,
        })
      );
  };

  render() {
    //set code to update table once updated
    if (this.state.updated == true) {
      axios.get("http://localhost:5000/api/admin/getstudents").then((res) => {
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
        <br />
        {this.newStudentModal()}
        <button
          className="btn"
          data-toggle="modal"
          data-target="#newStudentModal"
        >
          Add New Student{" "}
        </button>
        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>Registration Number </th>
              <th>Name</th>
              <th>Course</th>
              <th>cleared</th>
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
                    <td>{student.course}</td>
                    <td>{student.cleared ? "true" : "false"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RegistryTable;
