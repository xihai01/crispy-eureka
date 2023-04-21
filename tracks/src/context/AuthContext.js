import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, error_message: action.payload };
    case "signin": // handles both /signup and /signin
      return { error_message: "", token: action.payload };
    case "clear_error_message":
      return { ...state, error_message: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make api request to sign up with email and password
    // if request succeds, modify our state and say we are authenticated
    // if fails, show some error message
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signip", payload: response.data.token });
      navigate("mainFlow");
      console.log(response.data);
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
      console.log(err.message);
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    // make api request to sign in with email and password
    // if request succeds, modify our state and say we are authenticated
    // if fails, show some error message
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("mainFlow");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return () => {
    // modify state so we are signed out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage },
  { isSignedIn: false, error_message: "", token: null }
);
