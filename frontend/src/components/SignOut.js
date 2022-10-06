import React from "react";
import Cookie from "js-cookie";

class SignOut extends React.Component {

  // Communicates to the backend when a user signs out and removes the cookies of the session
  recordSignOut = () => {
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
        ActionDescription: "Sign out",
        Comment: 'Browser: ' + browser.name + 
             ' Version: ' + browser.version +
             ' OS: ' + browser.os        
      })
    });
    Cookie.remove('userID');
    Cookie.remove('taskID');
    Cookie.remove('topicID');
  };

  // Returns the elements forming the sign out button
  render() {
        return (
            <button
            type="button"
            className="log-out-button"
            onClick={() => {
                Cookie.set('idDisplay', "exp", { path: '/' });
                window.location.reload();
                window.open(SURVEY_LINK, '_blank');
                this.recordSignOut();
            }}
          >
            End task
          </button>
        );
    }
}

export default SignOut;