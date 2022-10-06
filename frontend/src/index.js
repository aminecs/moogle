import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
import request from "superagent";
import "./styles/app.css";
import Footer from "./components/Footer";
import Pagination from "react-js-pagination";
import "./styles/bootstrap.min.css";
import IDImplementation from "./components/IDImplementation"
import Cookie from "js-cookie"
import SignOut from "./components/SignOut"
// import ElapsedTime from "./components/ElapsedTime"

/* 
    App component which handles all the subcomponents
*/

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      term: "",
      results: [],
      activePage: 1,
      totalResults: 0,
    };
    this.myRef = React.createRef();
  }

  // Implements the page, it waits for the page change then updates the number of the current page
  async handlePageChange(pageNumber) {
    await this.setState({activePage: pageNumber});
    this.handleTermChange(this.state.term);
  }

  // Implements the cookies for the different IDs
  handleIDChange(userIDCookie, taskIDCookie, topicIDCookie) {
    Cookie.set('userID', userIDCookie, { path: '/' });
    Cookie.set('taskID', taskIDCookie, { path: '/' });
    Cookie.set('topicID', topicIDCookie, { path: '/' });
  }

  // Communicates to the backend the different results seen by the user
  storeRetrievedResults = () => {
    fetch("/postRetrievedResults", {
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
        Term: this.state.term,
        Results: this.state.results,
      })
    });
  };

  // Handles the communication with the BingAPI
  handleTermChange(term) {
    fetch('/postLogInfo', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Timestamp: (new Date()).getTime(),
          UserID: Cookie.get('userID'),
          TaskID: Cookie.get('taskID'),
          TopicID: Cookie.get('topicID'),
          ActionID: "Query submission",
          ActionDescription: term,
          Comment: term.length,
        })
    });
    if(term) {
      let activePage = this.state.activePage;
      if(term !== this.state.term) {
        this.setState({activePage : 1});
        activePage = 1;
      }

      const url = `https://api.cognitive.microsoft.com/bing/v7.0/search?q=${term}&responsefilter=Webpages&offset=${(activePage - 1) * 10}`

      request.get(url).set('Ocp-Apim-Subscription-Key', process.env.REACT_APP_BING_API_KEY).then(res => {
        this.setState({term: term});
        this.setState({ results: res.body.webPages.value });
        this.setState({ totalResults: res.body.webPages.totalEstimatedMatches})
        this.myRef.current.setState({results: res.body.webPages.value});
        
      });

      /* const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${term}&start=${(activePage - 1) * 10 + 1}`;

      request.get(url, (err, res) => {
        this.setState({term: term});
        this.setState({ results: res.body.items });
        this.setState({ totalResults: res.body.queries.request[0].totalResults})
        this.myRef.current.setState({results: res.body.items});
        this.storeRetrievedResults(res.body.items);
      }); */
    }
  }

  render() {
    return (
      <div>
      <div className="header">
      <SignOut />
          <div>
          <IDImplementation handleIDChange={(userIDCookie, taskIDCookie, topicIDCookie) => 
            this.handleIDChange(userIDCookie, taskIDCookie, topicIDCookie)}/>
          <SearchBar onTermChange={term => this.handleTermChange(term) } />
          <ResultList results={this.state.results} ref={this.myRef}/>
          <Pagination
          hideDisabled
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalResults}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
          </div>
        </div><div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
