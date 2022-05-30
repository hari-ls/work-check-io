import { useContext } from "react";
import { EntryContext } from "../context/entryContext";
import { useMutation } from "@apollo/client";
import { CHECKIN } from "../utils/mutations";
import moment from "moment";
import Loading from "../components/Loading";

function StartEntry(props) {
  const { checkIn } = useContext(EntryContext);

  const [startEntry, { loading }] = useMutation(CHECKIN, {
    update(_, { data: { entry: entryData } }) {
      checkIn(entryData);
    },
    variables: {
      start: moment().format(), // check for exact time when triggering
    },
  });

  if (loading) return <Loading />;

  return (
    <div className="p-12">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium">No entry for today!</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by checking in.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              startEntry();
            }}
          >
            Check in
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-mr-1 ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartEntry;
