import { useContext } from "react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useQuery, gql } from "@apollo/client";
import { ENTRY_DETAILS } from "../utils/queries";
import ViewEntry from "../components/ViewEntry";
import Loading from "../components/Loading";

function Entry(props) {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // const ENTRY_DETAILS = gql`
  //   query Entry($id: ID!) {
  //     entry(_id: $id) {
  //       checkIn
  //       plan
  //       summary
  //       productivity
  //       mood
  //       checkOut
  //       duration
  //     }
  //   }
  // `;

  const { loading, data } = useQuery(ENTRY_DETAILS, {
    onCompleted(data) {
      console.log(data.entry);
    },
    variables: {
      id: id,
    },
    skip: !user,
  });

  if (loading) return <Loading />;

  return (
    <main>
      <div className="container flex flex-col px-6 py-8 max-w-7xl space-y-4 mx-auto">
        {user ? (
          <div>
            <div className="pb-5 border-b-2 border-base-300 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-4xl font-bold">Entry Details</h2>
              <div className="mt-3 flex gap-4 sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
                <Link to="/journal">
                  <button type="button" className="btn">
                    My Journal
                  </button>
                </Link>
              </div>
            </div>
            {data.entry ? (
              <ViewEntry
                checkIn={data.entry.checkIn}
                checkOut={data.entry.checkOut}
                duration={data.entry.duration}
                plan={data.entry.plan}
                summary={data.entry.summary}
                productivity={data.entry.productivity}
                mood={data.entry.mood}
              />
            ) : (
              <div>
                <p>Entry not found!</p>
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

export default Entry;
