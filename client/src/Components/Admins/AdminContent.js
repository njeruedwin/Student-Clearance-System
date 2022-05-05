import React, { Component } from "react";
import LibraryTable from "./LibraryTable";
import GamesTable from "./GamesTable";
import FinanceTable from "./FinanceTable";
import RegistryTable from "./RegistryTable";
//my items list

class AdminContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedItem: "",
      role: "",
    };

    //the handleChange prop
    this.handleChange = this.handleChange.bind(this);
    this.handleRole = this.handleRole.bind(this);
  }

  //handleChange function
  handleChange = (event) => {
    console.log(event.target.value);
    let searchedItem = event.target.value;
    this.setState({
      searchedItem,
    });
  };

  //handle the role change
  handleRole = () => {
    const role = this.props.role;
    if (role == "librarian") {
      return <LibraryTable searchedItem={this.state.searchedItem} />;
    }
    if (role == "games") {
      return <GamesTable searchedItem={this.state.searchedItem} />;
    }
    if (role == "finance") {
      return <FinanceTable searchedItem={this.state.searchedItem} />;
    }
    if (role == "registry") {
      return <RegistryTable searchedItem={this.state.searchedItem} />;
    }
  };
  render() {
    console.log(this.state.items);
    console.log("The searched item is: " + this.state.searchedItem);
    return (
      <div>
        {/*The two components Search and TableG*/}
        <h1
          className="display-1"
          style={{ textAlign: "center", color: "rgb(184,115,51)" }}
        >
          The {this.props.role} Search Page
        </h1>
        <Search
          searchedItem={this.state.searchedItem}
          handleChange={this.handleChange}
        />
        {this.handleRole()}
      </div>
    );
  }
}

const Search = ({ searchedItem, handleChange }) => {
  return (
    <div>
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="form-group">
          <label></label>
          <input
            type="text"
            className="form-control form-control-sm"
            aria-describedby="helpId"
            placeholder=" Search "
            style={{ textAlign: "center" }}
            value={searchedItem}
            onChange={handleChange}
          />
          <small
            id="helpId"
            className="form-text text-muted"
            style={{ textAlign: "center", color: "rgb(184,115,51)" }}
          >
            Enter student Registration Number
          </small>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default AdminContent;
