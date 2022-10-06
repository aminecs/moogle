import React from "react";
import Cookie from "js-cookie"
import "../styles/app.css";
import "../styles/bootstrap.min.css";
import Button from '@material-ui/core/Button';


class IDImplementation extends React.Component {
    constructor () {
        super();
        this.state = {
            userID: '',
            taskID: '',
            topicID: '',
            inputUserID: false,
            inputTaskID: false,
            inputTopicID: false,
            idDisplay: undefined
        };
        this.handleChangeUserID = this.handleChangeUserID.bind(this);
        this.handleChangeTaskID = this.handleChangeTaskID.bind(this);
        this.handleChangeTopicID = this.handleChangeTopicID.bind(this);
        this.handleSubmitID = this.handleSubmitID.bind(this);
        this.showIDform = this.showIDform.bind(this);
        this.trialUseMode = this.trialUseMode.bind(this);
        this.timedUseMode = this.timedUseMode.bind(this);
        this.timedUse = this.timedUse.bind(this);
        this.endOfTime = this.endOfTime.bind(this);
        this.idClassName = 'isHidden';
        this.promptClassName = 'parent';
        this.chosenMode = 'NA';
        var timedUseTracker;
    }

    // Handles when there is a change in the user id
    handleChangeUserID(event) {
        this.setState({userID : event.target.value});

    }

    // Handles when there is a change in the task id
    handleChangeTaskID(event) {
        this.setState({taskID : event.target.value});
    }

    // Handles when there is a change in the topic id
    handleChangeTopicID(event) {
        this.setState({topicID : event.target.value});
    }

    // Handles when the user submits the session ids
    handleSubmitID(event) {
        if(this.chosenMode === "Timed") {
            this.timedUse();
        }
        this.props.handleIDChange(this.state.userID, this.state.taskID, this.state.topicID);
        this.browserDetails();
        this.setState({inputUserID: true});
        this.setState({inputTaskID: true});
        this.setState({inputTopicID: true});
        Cookie.set('idDisplay', "isHidden", { path: '/' });
        this.setState({idDisplay : Cookie.get('idDisplay')});
        event.preventDefault();
    }

    // Communicates to the backend the browser details when the user starts the task
    browserDetails = () => {
        const { detect } = require('detect-browser');
        const browser = detect();
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
            ActionDescription: "Sign in",
            Comment: 'Browser: ' + browser.name + 
                 ' Version: ' + browser.version +
                 ' OS: ' + browser.os        
          })
        });
      };

      showIDform() {
          this.idClassName = 'id-forms';
          this.forceUpdate();
      }

      timedUseMode() {
        this.showIDform();
        this.hidePrompt();
        this.chosenMode = "Timed";
      }
      
      trialUseMode() {
        this.showIDform();
        this.hidePrompt();
      }

      hidePrompt() {
        this.promptClassName = 'isHidden';
      }

      timedUse() {
        this.timedUseTracker = setTimeout(this.endOfTime, 480000);
      }

      endOfTime() {
        alert("Time is over. Click ok and click on the end task button (Top right corner)");
        clearTimeout(this.timedUseTracker);
        window.location.reload();
      }

    // Returns the elements forming the signing in page
    render () {
        const enableSubmitID = (this.state.userID.length > 0) && (this.state.taskID.length > 0) 
            && (this.state.topicID.length > 0);
        console.log(enableSubmitID);
        if(Cookie.get('idDisplay') === undefined) {
            Cookie.set('idDisplay', "exp", { path: '/' });
        }
        return (
            <div className={Cookie.get('idDisplay')}>
                <div className={this.promptClassName}>
                    <center><p>If it's your first time with Moogle, please click on the practice session button. 
                    Once you are ready and confident, there will be a button "end task" on the top right corner to come back and start again. 
                    If you are performing a practice task and a new tab opens, please close it. 
                    That form is to be completed only after the task. </p>
                <Button variant="contained" onClick={this.trialUseMode}>Practice session</Button>
                <Button variant="contained" onClick={this.timedUseMode}>Search task</Button></center>
                </div>
            <div className={this.idClassName}>
            Before you start your first task, please fill in the pre-task questionnaire. 
            Click <a href={SURVEY_LINK} target="_blank" rel="noopener noreferrer">here</a>.
            <form onSubmit={this.handleSubmitID}>
                    <input
                    className="user-id-input"
                    type="text"
                    value={this.state.value}
                    placeholder="Your user ID"
                    onChange={this.handleChangeUserID}
                    disabled={this.state.inputUserID} 
                    />
                    <input
                    className="task-id-input"
                    type="text"
                    value={this.state.value}
                    placeholder="Your task ID"
                    onChange={this.handleChangeTaskID}
                    disabled={this.state.inputTaskID} 
                    />
                    <input
                    className="task-id-input"
                    type="text"
                    value={this.state.value}
                    placeholder="Your topic ID"
                    onChange={this.handleChangeTopicID}
                    disabled={this.state.inputTopicID} 
                    />
                    <button 
                    className="submit-id-input"
                    type="submit" 
                    disabled={!enableSubmitID}>
                    Start task</button>
            </form>
            </div>
            </div>
        )
    }
}

export default IDImplementation;