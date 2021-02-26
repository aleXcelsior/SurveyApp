import React, { useState } from "react";
import { reduxForm } from "redux-form";

import "./SurveyForm";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);

  function renderContent() {
    if (showReview === true) {
      return (
        <SurveyFormReview
          onCancel={() => {
            setShowReview(false);
          }}
        />
      );
    } else {
      return (
        <SurveyForm
          onSurveySubmit={() => {
            setShowReview(true);
          }}
        />
      );
    }
  }

  return <div>{renderContent()}</div>;
};

export default reduxForm({ form: "surveyForm" })(SurveyNew);
