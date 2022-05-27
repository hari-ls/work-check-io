import { Link } from "react-router-dom";
import moment from "moment";

function EntryRow({ checkIn, checkOut, duration, productivity, mood, id }) {
  //   const checkInTime = "";
  //   const checkInDate = "";

  //   const checkOutTime = "";
  //   const checkOutDate = "";

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">08:30 AM</div>
            <div className="text-sm opacity-50">13th May 2022</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">05:30 PM</div>
            <div className="text-sm opacity-50">13th May 2022</div>
          </div>
        </div>
      </td>
      <td>
        <p>{duration} hrs</p>
      </td>
      <td>
        <p>{productivity}/10</p>
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

export default EntryRow;
