import React from "react";

const surveyField = (props) => {
  const { input, label, meta } = props;
  const { touched, error } = meta;

  return (
    <div>
      <label>{label}</label>
      <input
        {...input} /* Takes all the reduxForms input functions and assigns it to this input field */
        style={{ marginBottom: "5px" }}
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default surveyField;
