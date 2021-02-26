import { connect } from "react-redux";
import React from "react";

import EmailTemplate from "../../emailTemplate/surveyTemplate";
import formFields from "./formFields";

import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import surveyTemplate from "../../emailTemplate/surveyTemplate";

const SurveyFormReview = (props) => {
  const { formValues, submitSurvey, history } = props;

  const renderReview = formFields.map((field) => {
    return (
      <div key={field.label}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please review your inputs:</h5>
      {renderReview}
      <div style={{ marginTop: "20px" }}>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={props.onCancel}
        >
          Go Back
        </button>
        <button
          className="green btn-flat right white-text"
          onClick={() => {
            submitSurvey(formValues, history);
          }}
        >
          Send survey
          <i className="material-icons right">email</i>
        </button>
      </div>

      <h5>Your email will look like this: </h5>
      <div
        dangerouslySetInnerHTML={{
          __html: EmailTemplate(formValues),
        }}
      ></div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
