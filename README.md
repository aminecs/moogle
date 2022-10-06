# Moogle - Search System

##### Developed in React

Moogle is composed of a react web application (front-end) and a flask application (backend). The React application front end can work on its own to have a simple search engine experience without any log data stored. When both the web application and flask application are running, the web application makes a series of post requests to the backend to store log data of the users interaction with the search system.

**Please make sure to add your own Bing API key to use the search system.   
To add your own API key, you will have to create a file .env at the root and have the variable REACT\_APP\_BING\_API_KEY set to your own key.**

Required: npm (6.7.0), Python (3.7.1), conda (4.5.1), flask (1.0.2)

### 1. Getting started

* To start the web application:

	```npm install```

* To start the backend:

	```export FLASK_APP=search-system.py```

	```flask run```

* First time running the backend ? (conda should be installed)

	```conda env create -f environment.yml```

### 2. Moogle web application

**index.js**: App component  
**src/components**: Different components used, you can extend the app by adding more components
styles: It contains the CSS files


Bing API's JSON format is the one currently handled by the system.
BETA: Google Search API implementation (commented out)

### 3. Log-moogle, the backend application

**search-system.py**: Generates a file which contains the log data in a file called 'log.txt' and it contains a method called postLogInfo which captures the log data sent by the web application.

The format in which the log data is saved:  
(Timestamp, UserID, TaskID, ActionID, Comment)







