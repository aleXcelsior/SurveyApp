import axios from "axios";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: "FETCH_USER", payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: "FETCH_USER", payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: "FETCH_USER", payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  console.log("Am I getting called?");

  const res = await axios.get("/api/surveys");

  dispatch({ type: "FETCH_SURVEYS", payload: res.data });
};

export const deleteSurvey = (surveyToDelete) => async (dispatch) => {
  const res = await axios({
    method: "post",
    url: "/api/surveydelete",
    data: { id: surveyToDelete },
  });

  dispatch(fetchSurveys());
};
