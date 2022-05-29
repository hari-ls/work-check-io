import TableEntryRow from "./TableEntryRow";

function JournalEntries({ entries, remove }) {
  return (
    <div>
      {/* <div>
        <h3>Entries</h3>
      </div> */}

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Duration</th>
              <th>Productivity</th>
              <th>Mood</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <TableEntryRow
                checkIn={entry.checkIn}
                checkOut={entry.checkOut}
                duration={entry.duration}
                productivity={entry.productivity}
                mood={entry.mood}
                id={entry._id}
                key={entry._id}
                no={index + 1}
                changer={remove}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Duration</th>
              <th>Productivity</th>
              <th>Mood</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default JournalEntries;
