import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign up with email and password
    // if request succeds, modify our state and say we are authenticated
    // if fails, show some error message
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign in with email and password
    // if request succeds, modify our state and say we are authenticated
    // if fails, show some error message
  };
};

const signout = (dispatch) => {
  return () => {
    // modify state so we are signed out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { isSignedIn: false }
);
