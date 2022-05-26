import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/client";
import { OPEN_ENTRY } from "../utils/queries";
import StartEntry from "../components/StartEntry";
import EditEntry from "../components/EditEntry";

function Home(props) {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(OPEN_ENTRY, {
    onCompleted(data) {
      console.log(data.entry);
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
                    My Journal
                  </button>
                </Link>
                {/* <button type="button" className="btn btn-primary">
                  Check out
                </button> */}
              </div>
            </div>

            {data.entry ? (
              <EditEntry id={data.entry._id} checkIn={data.entry.checkIn} />
            ) : (
              <StartEntry />
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
