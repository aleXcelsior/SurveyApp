import { connect } from "react-redux";
import React, { useEffect } from "react";

import { fetchSurveys, deleteSurvey } from "../../actions";

const SurveyList = (props) => {
  const { fetchSurveys, deleteSurvey, surveys } = props;

  useEffect(() => {
    fetchSurveys();
  }, []);

  function removeSurvey(surveyId) {
    deleteSurvey(surveyId);
  }

  function renderSurveys() {
    return surveys.reverse().map((survey) => {
      return (
        <div className="card grey lighten-3" key={survey._id}>
          <div
            className="right"
            onClick={() => {
              removeSurvey(survey._id);
            }}
          >
            <i className="material-icons" style={{ cursor: "pointer" }}>
              delete_forever
            </i>{" "}
          </div>
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
            <a>No {survey.no}</a>
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

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
  SurveyList
);
