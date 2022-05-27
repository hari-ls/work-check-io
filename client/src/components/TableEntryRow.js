import { Link } from "react-router-dom";
import moment from "moment";

function TableEntryRow({
  no,
  checkIn,
  checkOut,
  duration,
  productivity,
  mood,
  id,
}) {
  const checkInTime = moment.unix(checkIn / 1000).format("h:mm A");
  const checkInDate = moment.unix(checkIn / 1000).format("Do MMM YYYY");

  const checkOutTime = moment.unix(checkOut / 1000).format("h:mm A");
  const checkOutDate = moment.unix(checkOut / 1000).format("Do MMM YYYY");

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
      </th>
    </tr>
  );
}

export default TableEntryRow;
