import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/client";
import { COMPLIE_JOURNAL } from "../utils/queries";
import moment from "moment";
import JournalEntries from "../components/JournalTable";
import Loading from "../components/Loading";

function Journal(props) {
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [entries, setEntries] = useState([]);

  const handleChange = (event) => {
    let selectedRange = event.target.value;
    setSelected(event.target.value);
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
  };

  const { loading, data, refetch } = useQuery(COMPLIE_JOURNAL, {
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
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.journal.entries.length > 0) {
        setEntries(data.journal.entries);
      } else {
        setEntries([]);
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [selected, refetch]);

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
                  value={selected}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Quarter</option>
                  <option>This Year</option>
                </select>
                <Link to="/">
                  <button type="button" className="btn">
                    Entry
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
