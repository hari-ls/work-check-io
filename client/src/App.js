import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Error from "./pages/Error";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import Workspace from "./pages/Workspace";
import SelectWorkspace from "./pages/Workspace/Select";
import CreateWorkspace from "./pages/Workspace/Create";
import UpdateWorkspace from "./pages/Workspace/Update";
import Schedule from "./pages/Schedule";
import NewSchedule from "./pages/Schedule/New";
import Entry from "./pages/Entry";
import ListEntries from "./pages/Entry/List";
import Journal from "./pages/Journal";
import ComplileJournal from "./pages/Journal/Complie";
import AllJournals from "./pages/Journal/All";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_SERVER,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workspace/create" element={<CreateWorkspace />} />
            <Route path="/workspace/select" element={<SelectWorkspace />} />
            <Route path="/workspace/:slug" element={<Workspace />} />
            <Route path="/workspace/update" element={<UpdateWorkspace />} />
            <Route path="/schedule/new" element={<NewSchedule />} />
            <Route path="/schedule/:id" element={<Schedule />} />
            <Route path="/entries" element={<ListEntries />} />
            <Route path="/entry/:id" element={<Entry />} />
            <Route path="/journals" element={<AllJournals />} />
            <Route path="/journal/complie" element={<ComplileJournal />} />
            <Route path="journal/:id" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
