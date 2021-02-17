import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = (props) => {
  const { fetchUser } = props; // Destructure the fetchUser action from the props (that gets passed by the connect function)

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Landing}></Route>
          <Route path="/surveys" exact component={Dashboard}></Route>
          <Route path="/surveys/new" exact component={SurveyNew}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

//Connect puts all the actions as props that gets passed to the App component
export default connect(null, actions)(App);
