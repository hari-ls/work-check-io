import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useQuery, gql } from "@apollo/client";
import { COMPLIE_JOURNAL } from "../utils/queries";
import moment from "moment";
import Chart from "chart.js/auto";
import JournalEntries from "../components/JournalTable";
import Loading from "../components/Loading";

function Journal(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // const COMPLIE_JOURNAL = gql`
  //   query Journal($start: String!, $end: String!) {
  //     journal(start: $start, end: $end) {
  //       from
  //       to
  //       entries {
  //         _id
  //         checkIn
  //         plan
  //         summary
  //         productivity
  //         mood
  //         checkOut
  //         duration
  //       }
  //     }
  //   }
  // `;

  const [selected, setSelected] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [entries, setEntries] = useState([]);

  const handleChange = (event) => {
    let selectedRange = event.target.value;
    console.log(selectedRange);
    switch (selectedRange) {
      case "This Week":
        setfromDate(moment().startOf("week"));
        setToDate(moment().endOf("day"));
        break;
      case "This Month":
        setfromDate(moment().startOf("month"));
        setToDate(moment().endOf("day"));
        break;
      case "This Quarter":
        setfromDate(moment().startOf("quarter"));
        setToDate(moment().endOf("day"));
        break;
      case "This Year":
        setfromDate(moment().startOf("year"));
        setToDate(moment().endOf("day"));
        break;
      default:
        setfromDate(moment().startOf("week"));
        setToDate(moment().endOf("day"));
        return;
    }
    console.log(fromDate, toDate);
  };

  const { loading, data } = useQuery(COMPLIE_JOURNAL, {
    onCompleted(data) {
      console.log(data.journal);
      // if (data.journal.entries.length > 0) {
      //   console.log("Entries updated from completed");
      //   setEntries(data.journal.entries);
      //   console.log(entries);
      // } else {
      //   setEntries([]);
      // }
    },
    variables: {
      start: fromDate,
      end: toDate,
    },
    skip: !user,
  });

  useEffect(() => {
    setSelected("This Week");
    setfromDate(moment().startOf("week"));
    setToDate(moment().endOf("day"));
  }, []);

  useEffect(() => {
    if (data.journal.entries.length > 0) {
      console.log("Entries updated from effect");
      setEntries(data.journal.entries);
    } else {
      setEntries([]);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(entries);
  // }, [entries]);

  if (loading) return <Loading />;

  const removeFromList = (findId) => {
    const entriesList = entries.filter((object) => {
      return object._id !== findId;
    });
    setEntries(entriesList);
  };

  return (
    <main>
      <div className="container flex flex-col px-6 py-8 max-w-7xl space-y-4 mx-auto">
        {user ? (
          <div>
            <div className="pb-5 border-b-2 border-base-300 sm:flex sm:items-center sm:justify-between">
              <div className="mt-3 flex flex-auto">
                <h2 className="text-4xl font-bold">My Journal</h2>
              </div>
              <div className="mt-3 flex flex-auto gap-4 sm:mt-0 sm:ml-4 w-auto justify-end">
                <select
                  className="select select-bordered select-md w-full max-w-xs"
                  onChange={handleChange}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Quarter</option>
                  <option>This Year</option>
                </select>
                <Link to="/">
                  <button type="button" className="btn">
                    Today's Entry
                  </button>
                </Link>
              </div>
            </div>
            {entries.length > 0 ? (
              <>
                <JournalEntries entries={entries} remove={removeFromList} />
              </>
            ) : (
              <div>
                <p>No entries not found!</p>
              </div>
            )}
          </div>
        ) : (
          <Navigate to="/login" replace={true} />
        )}
      </div>
    </main>
  );
}

export default Journal;
