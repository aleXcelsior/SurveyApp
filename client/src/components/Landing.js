import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Landing = (props) => {
  const history = useHistory();

  if (props?.auth?.googleId) {
    history.push("/surveys");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to surveynator</h1>
      <h4>An easy way to collect data and feedback from your users</h4>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
