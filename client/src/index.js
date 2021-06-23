import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import ViewWeekOff from "./components/ViewWeekOff";
import "bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.min.css';
import Header from "./components/header";
import App from "./App";

const history = createBrowserHistory();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
    <Header />
      <main>
     <Switch>
     <Route path='/' exact>
          <App />
        </Route> 
        <Route path="/view-weekoff">
            < ViewWeekOff />
          </Route>
        </Switch>
      </main>
    </Router>
  </React.StrictMode>,
  rootElement
);
