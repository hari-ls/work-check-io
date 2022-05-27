import { createContext, useReducer } from "react";
// define initial state
const initialState = {
  checkedIn: false,
  entry: null,
};
// create context
const EntryContext = createContext({
  checkedIn: false,
  entry: null,
  checkIn: (entryData) => {},
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
      };
    case "CHECKOUT":
      return {
        ...state,
        checkedIn: false,
        entry: null,
      };
    default:
      return state;
  }
}
// define provider
function EntryProvider(props) {
  const [state, dispatch] = useReducer(entryReducer, initialState);

  const checkIn = (entryData) => {
    console.log(entryData);
    dispatch({
      type: "CHECKIN",
      payload: entryData,
    });
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
        checkIn,
        checkOut,
      }}
      {...props}
    />
  );
}

export { EntryContext, EntryProvider };
