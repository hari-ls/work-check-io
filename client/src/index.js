import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import client from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { EntryProvider } from "./context/entryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <EntryProvider>
      <ApolloProvider client={client}>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
      </ApolloProvider>
    </EntryProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
