import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import moment from "moment";
import Loading from "./Loading";

function TableEntryRow({
  no,
  checkIn,
  checkOut,
  duration,
  productivity,
  mood,
  id,
  changer,
}) {
  const checkInTime = moment.unix(checkIn / 1000).format("h:mm A");
  const checkInDate = moment.unix(checkIn / 1000).format("Do MMM YYYY");

  const checkOutTime = moment.unix(checkOut / 1000).format("h:mm A");
  const checkOutDate = moment.unix(checkOut / 1000).format("Do MMM YYYY");

  function invokeRemoveEntry() {
    console.log("Remove entry invoked");
    removeEntry();
  }

  const REMOVE_ENTRY = gql`
    mutation RemoveEntry($id: ID!) {
      entry: removeEntry(_id: $id) {
        __typename
      }
    }
  `;

  const [removeEntry, { loading }] = useMutation(REMOVE_ENTRY, {
    update(_, { data: { entry: entryData } }) {
      console.log(entryData);
      if (entryData.__typename === "Entry") changer(id);
    },
    variables: {
      id,
    },
  });

  if (loading)
    return (
      <tr>
        <td>
          <Loading />
        </td>
      </tr>
    );

  return (
    <tr key={id}>
      <td>{no}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{checkInTime}</div>
            <div className="text-sm opacity-50">{checkInDate}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{checkOutTime}</div>
            <div className="text-sm opacity-50">{checkOutDate}</div>
          </div>
        </div>
      </td>
      <td>
        <p>{duration} hrs</p>
      </td>
      <td>
        <p>{(productivity * 100) / 10}%</p>
      </td>
      <td>
        <p>{mood}</p>
      </td>
      <th>
        <Link to={`/entry/${id}`}>
          <button className="btn btn-ghost btn-xs">details</button>
        </Link>
        <button className="btn btn-ghost btn-xs" onClick={invokeRemoveEntry}>
          remove
        </button>
      </th>
    </tr>
  );
}

export default TableEntryRow;
