import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Store, { Context } from "./utils/Store";
import Error from "./pages/Error";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import Entry from "./pages/Entry";
import ListEntries from "./pages/Entry/List";
import Journal from "./pages/Journal";
import ComplileJournal from "./pages/Journal/Complie";
import AllJournals from "./pages/Journal/All";

function App() {
  return (
    <div>
      {/* <Store> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/entries" element={<ListEntries />} />
        <Route path="/entry/:id" element={<Entry />} />
        <Route path="/journals" element={<AllJournals />} />
        <Route path="/journal/compile" element={<ComplileJournal />} />
        <Route path="journal/:id" element={<Journal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </Store> */}
    </div>
  );
}

export default App;
