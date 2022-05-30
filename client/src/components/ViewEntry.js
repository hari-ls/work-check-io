import moment from "moment";

function ViewEntry({
  checkIn,
  checkOut,
  duration,
  plan,
  summary,
  productivity,
  mood,
}) {
  return (
    <div className="p-2 space-y-4 divide-y divide-base-300">
      <div className="pt-4">
        <p>
          <strong>Check in: </strong>{" "}
          {moment.unix(checkIn / 1000).format("LLL")}
        </p>
        <p>
          <strong>Check out: </strong>
          {moment.unix(checkOut / 1000).format("LLL")}
        </p>
      </div>
      <div className="space-y-4 pt-4">
        <div>
          <h4 className="text-xl font-semibold">Plan</h4>
          <p>
            {plan ? (
              plan.split("\n").map((line) => (
                <>
                  {line} <br />
                </>
              ))
            ) : (
              <></>
            )}
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Summary</h4>
          <p>
            {summary ? (
              summary.split("\n").map((line) => (
                <>
                  {line} <br />
                </>
              ))
            ) : (
              <></>
            )}
          </p>
        </div>
      </div>
      <div className="pt-4">
        <p>
          <strong>Duration: </strong> {duration} hrs
        </p>
        <p>
          <strong>Productivity: </strong> {productivity}
        </p>
        <p>
          <strong>Mood: </strong> {mood}
        </p>
      </div>
    </div>
  );
}

export default ViewEntry;
