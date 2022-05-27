import { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { EntryContext } from "../context/entryContext";
import { useQuery } from "@apollo/client";
import { OPEN_ENTRY } from "../utils/queries";
import StartEntry from "../components/StartEntry";
import EditEntry from "../components/EditEntry";
import EndEntry from "../components/EndEntry";

function Home(props) {
  const { user } = useContext(AuthContext);
  const { checkedIn, entry, checkIn, checkOut } = useContext(EntryContext);

  const [showModal, setShowModal] = useState();

  useEffect(() => {
    setShowModal(false);
  }, []);

  const { loading, data } = useQuery(OPEN_ENTRY, {
    onCompleted(data) {
      console.log(data.entry, checkedIn, entry);
      if (data.entry) {
        console.log("checked in");
        checkIn(data.entry);
        console.log(checkedIn, entry);
      }
    },
    skip: !user,
  });

  if (loading) return <p>LOADING</p>;

  return (
    <main>
      <EndEntry />
      <div className="container flex flex-col px-6 py-8 max-w-7xl space-y-4 mx-auto">
        {user ? (
          <div>
            <div className="pb-5 border-b-2 border-base-300 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-4xl font-bold">
                Welcome, {user.data.firstName} {user.data.lastName}
              </h2>
              <div className="mt-3 flex gap-4 sm:mt-0 sm:ml-4">
                <Link to="/journal">
                  <button type="button" className="btn">
                    My Journal
                  </button>
                </Link>
                {checkedIn ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Check out
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {checkedIn ? (
              <EditEntry
                id={entry._id}
                checkIn={entry.checkIn}
                plan={entry.plan}
                summary={entry.summary}
              />
            ) : (
              <StartEntry checkIn={checkIn} />
            )}
          </div>
        ) : (
          <Navigate to="/login" replace={true} />
        )}
      </div>
    </main>
  );
}

export default Home;
