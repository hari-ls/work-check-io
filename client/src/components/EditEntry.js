import { useEffect, useState } from "react";
import moment from "moment";

function EditEntry({ id, checkIn, plan, summary, checkOut }) {
  const getDuration = () => {
    const startTime = moment.unix(checkIn / 1000);
    const endTime = moment();

    var hrs = moment.utc(endTime.diff(startTime)).format("HH");
    var min = moment.utc(endTime.diff(startTime)).format("mm");
    var sec = moment.utc(endTime.diff(startTime)).format("ss");

    const value = [hrs, min, sec].join(":");

    // console.log(value);
    return value;
  };

  const [durationState, setDurationState] = useState(getDuration());

  useEffect(() => {
    setInterval(() => setDurationState(getDuration()), 1000);
  }, []);

  return (
    <div>
      {/* <p>Edit an entry {id}</p> */}
      <div className="flex flex-row justify-between py-4">
        <p>
          Check in:{" "}
          {moment.unix(checkIn / 1000).format("dddd, MMMM Do YYYY, h:mm a")}
        </p>
        <span className="countup font-mono text-2xl">
          <span>{durationState}</span>
        </span>
      </div>
      <div className="flex flex-col">
        <form className="space-y-2">
          <div>
            <label htmlFor="plan" className="label text-2xl">
              Plan
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="What do you plan to accomplish today?"
              rows="5"
            ></textarea>
          </div>
          <div>
            <label htmlFor="summary" className="label text-2xl">
              Summary
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="A summary of things..."
              rows="10"
            ></textarea>
          </div>
          <div className="flex flex-row gap-4">
            <button type="button" className="btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEntry;
