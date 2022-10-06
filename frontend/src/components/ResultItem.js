import React from "react";
import Cookie from "js-cookie"

class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: props.resObj,
      modalClassName: "isHidden",
      websiteUrl: "about:blank"
    }
  }

  // Communicates to the backend when the user hovers on a result title
  onHoverResultTitle = (title, url) => {
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
        ActionDescription: title,
        Comment: url
      })
    });
  };

  // Handles when the user closes the iFrame
  closeModal = () => {
    this.setState({modalClassName: "isHidden", websiteUrl: "about:blank"});
  };

  // Handles when the user opens the iFrame
  openModal = (e, websiteUrl) => {
    this.setState({modalClassName: "isShown", websiteUrl: websiteUrl});
    e.preventDefault();
  };

  // Communicates to the backend when the user clicks on a result item
  onClickResultItem = (title, url) => {
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
        ActionDescription: title,
        Comment: url,
      })
    });
  };

  // Communicates to the backend when the user clicks on relevant (iFrame context)
  onClickRelevant = () => {
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
        ActionDescription: "Relevant",
        Comment: "Relevance",
      })
    });
  };

  // Communicates to the backend when the user clicks on irrelevant (iFrame context)
  onClickIrrelevant = () => {
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
        ActionDescription: "Irrelevant",
        Comment: "Relevance",
      })
    });
  };

  // Formats the url of a result item returned by the BingAPI
  formatUrl = (url) => {
    if (!url.startsWith("http")) {
      return "http://" + url;
    }
    return url;
  }
  
  // Ensures the result item is updated when there is a state change
  componentDidUpdate(prevProps, prevState) {
    if (this.props.resObj !== this.state.result) {
      this.setState({
        result: this.props.resObj
      })
    }
  }

  // Returns the elements forming a result item
  render() {
    return (
      <li>
        <div className={this.state.modalClassName}>
          <button
            type="button"
            className="relevance-button"
            onClick={() => {
              this.closeModal();
              this.onClickIrrelevant();
            }}
          >
            Irrelevant
          </button>
          <button
            type="button"
            className="relevance-button"
            onClick={() => {
              this.closeModal();
              this.onClickRelevant();
            }}
          >
            Relevant
          </button>
          <iframe
            title="Choosen website"
            src={this.state.result.link}
            width="100%"
            height="100%"
            sandbox="allow-forms allow-popups  allow-pointer-lock  allow-same-origin  allow-scripts"
          />
        </div>
        <a
          href={this.formatUrl(this.state.result.formattedUrl)}
          onMouseOver={() => {
            this.onHoverResultTitle(this.state.result.title, this.state.result.formattedUrl);
          }}
          onClick={(event) => {
            this.openModal(event, this.state.result.link);
            this.onClickResultItem(this.state.result.title, this.state.result.link);
          }}
        >
          {this.state.result.title}
        </a>
        <ul style={{color: 'green'}}>{this.state.result.formattedUrl}</ul>
        <ul>
          <li
            onMouseOver={() => {
              this.onHoverResultTitle(this.state.result.title, this.state.result.formattedUrl);
            }}
          >
            {this.state.result.snippet}
          </li>
        </ul>
      </li>
    );
  }
}

export default ResultItem;
