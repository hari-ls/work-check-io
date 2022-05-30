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
  const {
    checkedIn,
    entry,
    checkingOut,
    checkIn,
    update,
    finalising,
    checkOut,
  } = useContext(EntryContext);

  // useEffect(() => {
  //   console.log(checkingOut);
  // }, [checkingOut]);

  const { loading } = useQuery(OPEN_ENTRY, {
    onCompleted(data) {
      console.log(data.entry);
      if (data.entry) {
        checkIn(data.entry);
      }
    },
    skip: !user,
  });

  if (loading) return <p>LOADING</p>;

  return (
    <main>
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
                    Journal
                  </button>
                </Link>
                {checkedIn ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      finalising(true);
                    }}
                  >
                    Check out {checkingOut}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {checkedIn ? (
              <>
                <EditEntry
                  id={entry._id}
                  checkIn={entry.checkIn}
                  plan={entry.plan}
                  summary={entry.summary}
                  update={update}
                />
                {checkingOut ? (
                  <EndEntry
                    id={entry._id}
                    plan={entry.plan}
                    summary={entry.summary}
                    checkOut={checkOut}
                    finalise={finalising}
                  />
                ) : (
                  <></>
                )}
              </>
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
