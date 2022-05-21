import { createContext, useState, useReducer } from "react";

// set current workspace*
// check if admin*
// set open entry*
// set applicable schedule*

const UserDataContext = createContext();

function UserDataProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [isAdmin, setIsAdmin] = useSate(false);
  const [applicableSchedule, setApplicableSchedule] = useSate("");
  const [openEntry, setOpenEntry] = useState("");

  return (
    <UserDataContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </UserDataContext.Provider>
  );
}

export { UserDataProvider };
