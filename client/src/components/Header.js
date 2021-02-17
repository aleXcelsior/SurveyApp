import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

const Header = (props) => {
  const { auth } = props;

  function renderContent() {
    if (auth === null) {
      //checking if user is logged in.
      return;
    } else if (!auth) {
      //user isn't logged in
      return (
        <li>
          <a href="/auth/google">Login with google</a>
        </li>
      );
    } else {
      //user is logged in
      return [
        <li key="1">
          <Payments />
        </li>,
        <li key="2" style={{ margin: "0 10px" }}>
          Credits: {auth.credits}
        </li>,
        <li key="3">
          <a href="/api/logout">Logout</a>
        </li>,
      ];
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? "/surveys" : "/"} className=" left brand-logo">
          Surveynator
        </Link>
        <ul id="nav-mobile" className="right">
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
};

//Mapstatetoprops always gets called with the current state. Here we destructure 'auth' from the state variable
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
