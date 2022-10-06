import React from "react";
import Cookie from "js-cookie";

/* 
    Potential implementation of the elapsed time (seconds)
*/
class ElapsedTime extends React.Component {
    constructor () {
        super();
        this.state = {
            secondsElapsed: 0
        };
        this.tick = this.tick.bind(this);
    }

    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }

    componentDidMount() {
        if(Cookie.get('idDisplay') === "isHidden") {
            this.interval = setInterval(this.tick, 1000);
            console.log(Cookie.get('idDisplay'));
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        )
    }
}

export default ElapsedTime;