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
    <div>
      <p>Check in: {moment.unix(checkIn / 1000).format("LLL")}</p>
      <p>Check out: {moment.unix(checkOut / 1000).format("LLL")}</p>
      <p>Duration: {duration}</p>
      <p>Plan: {plan}</p>
      <p>Summary: {summary}</p>
      <p>Productivity: {productivity}</p>
      <p>Mood: {mood}</p>
    </div>
  );
}

export default ViewEntry;
