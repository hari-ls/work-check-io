import { createContext, useReducer } from "react";
import AuthService from "../utils/AuthService";
// define initial state
const initialSate = {
  user: null,
};
// update intial state
if (AuthService.loggedIn()) {
  initialSate.user = AuthService.getProfile();
}
// initialise context
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});
// create reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
// define provider
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialSate);

  // shortcut fns to call actions
  const login = (userData) => {
    AuthService.login(userData.token);
    console.log(userData.user.existing);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    AuthService.logout();
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
