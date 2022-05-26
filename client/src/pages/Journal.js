import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import Chart from "chart.js/auto";

function Journal(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <main>
      {user ? (
        <div className="container flex mx-auto max-w-7xl p-4">
          <h1>Journal</h1>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </main>
  );
}

export default Journal;
