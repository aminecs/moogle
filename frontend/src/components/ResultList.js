import React from "react";
import ResultItem from "./ResultItem";

class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: props.results
    }
  }

  getResultTitle = title => {
    console.log("Title of object" + title);
  };

  // Updates the results lists when there is a page change or a new query
  componentDidUpdate(prevProps, prevState) {
    if (this.state.results !== prevState.results) {
      this.setState({results: this.state.results})
      this.forceUpdate();  
    }
  }

  // Returns a list of result items
  render() {
    this.resultItems = this.state.results.map((result, i) => {
      return (
        <ResultItem
          key={i}
          resObj={result}
          onClick={() => {
            this.getResultTitle(result.name);
          }}
        />
      );
    });
    return(
      <ul className="result-list">{this.resultItems}</ul>
    );
  }
}

export default ResultList;
