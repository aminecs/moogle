import React from "react";
import logo from "../Moogle.png"
import Cookie from "js-cookie"

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = { 
      term: "",
      submittedQuery: "",
      titleClassName: "title",
      searchClassName: "search",
      searchBarClassName: "search-bar",
      submitClassName: "submit-button",
      querySubmittedClassName: "isHidden"
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handles the change of state of the term
  handleChange(event) {
    this.setState({ term: event.target.value });
  }

  // Handles the submission of the term by the user
  handleSubmit(event) {
    this.setState({ submittedQuery: this.state.term });
    this.props.onTermChange(this.state.term);
    event.preventDefault();
  }

  // Communicates to the backend when the user hovers on the search bar
  onHoverSearchBar() {
    fetch("/postLogInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Timestamp: new Date().getTime(),
        UserID: Cookie.get('userID'),
        TaskID: Cookie.get('taskID'),
        TopicID: Cookie.get('topicID'),
        ActionID: "Mouse hovering",
        ActionDescription: "Hovering on search bar",
        Comment: "Search bar"
      })
    });
  }

  // Communicates to the backend when the user hovers on the search button
  onHoverSearchButton() {
    fetch("/postLogInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Timestamp: new Date().getTime(),
        UserID: Cookie.get('userID'),
        TaskID: Cookie.get('taskID'),
        TopicID: Cookie.get('topicID'),
        ActionID: "Mouse hovering",
        ActionDescription: "Hovering on search button",
        Comment: "Search button"
      })
    });
  }

  // Communicates to the backend when the user clicks on the search button
  onClickSearchButton() {
    fetch("/postLogInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Timestamp: new Date().getTime(),
        UserID: Cookie.get('userID'),
        TaskID: Cookie.get('taskID'),
        TopicID: Cookie.get('topicID'),
        ActionID: "Click",
        ActionDescription: "Click on search button",
        Comment: "Search button"
      })
    });
    this.setState({
      titleClassName: "title-results",
      searchClassName: "search-results",
      searchBarClassName: "search-bar-results",
      submitClassName: "submit-button-results",
      querySubmittedClassName: "query-submitted-is"
    })
  }

  // Returns the elements composing the search bar
  render() {
    return (
      <div className={this.state.searchClassName}>
        <img className={this.state.titleClassName} src={logo} alt="Logo" />
        <form onSubmit={this.handleSubmit}>
          <input
            className={this.state.searchBarClassName}
            type="text"
            value={this.state.value}
            placeholder="Enter search"
            onChange={this.handleChange}
            onMouseOver={() => {
              this.onHoverSearchBar();
            }}
          />
          
          <input
            className={this.state.submitClassName}
            type="submit"
            value="Moogle Search"
            onMouseOver={() => {
              this.onHoverSearchButton();
            }}
            onClick=  {() => {
              this.onClickSearchButton();
            }}
          />
        </form>

        <div className="clear"></div>
        <p className={this.state.querySubmittedClassName}>Query submitted: {this.state.submittedQuery}</p>
      </div>
    );
  }
}

export default SearchBar;
