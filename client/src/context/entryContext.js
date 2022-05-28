import { createContext, useReducer } from "react";
// define initial state
const initialState = {
  checkedIn: false,
  entry: null,
  checkingOut: false,
};
// create context
const EntryContext = createContext({
  checkedIn: false,
  entry: null,
  checkingOut: false,
  checkIn: (entryData) => {},
  update: (entryData) => {},
  finalise: (bool) => {},
  checkOut: () => {},
});
// define reducer
function entryReducer(state, action) {
  switch (action.type) {
    case "CHECKIN":
      return {
        ...state,
        checkedIn: true,
        entry: action.payload,
        checkingOut: false,
      };

    case "UPDATE":
      return {
        ...state,
        entry: action.payload,
      };
    case "OPEN":
      return {
        ...state,
        checkingOut: true,
      };
    case "CLOSE":
      return {
        ...state,
        checkingOut: false,
      };
    case "CHECKOUT":
      return {
        ...state,
        checkedIn: false,
        entry: null,
        checkingOut: false,
      };
    default:
      return state;
  }
}
// define provider
function EntryProvider(props) {
  const [state, dispatch] = useReducer(entryReducer, initialState);

  const checkIn = (entryData) => {
    console.log("CHECKIN", entryData);
    dispatch({
      type: "CHECKIN",
      payload: entryData,
    });
  };
  const update = (entryData) => {
    console.log("UPDATE", entryData);
    dispatch({
      type: "UPDATE",
      payload: entryData,
    });
  };
  const finalising = (bool) => {
    if (bool) {
      dispatch({
        type: "OPEN",
      });
    } else {
      dispatch({
        type: "CLOSE",
      });
    }
  };
  const checkOut = () => {
    dispatch({
      type: "CHECKOUT",
    });
  };

  return (
    <EntryContext.Provider
      value={{
        checkedIn: state.checkedIn,
        entry: state.entry,
        checkingOut: state.checkingOut,
        checkIn,
        update,
        finalising,
        checkOut,
      }}
      {...props}
    />
  );
}

export { EntryContext, EntryProvider };
