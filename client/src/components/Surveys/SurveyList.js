import { connect } from "react-redux";
import React, { useEffect } from "react";

import { fetchSurveys } from "../../actions";

const SurveyList = (props) => {
  const { fetchSurveys, surveys } = props;

  useEffect(() => {
    fetchSurveys();
  }, []);

  function renderSurveys() {
    console.log(surveys);
    return surveys.reverse().map((survey) => {
      return (
        <div className="card grey lighten-3" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Survey sent: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action center">
            <p style={{ marginTop: "-10px" }}>Votes:</p>
            <a>Yes {survey.yes}</a>
            <a>Yes {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  return <div>{renderSurveys()}</div>;
};

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
