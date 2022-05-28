import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { UPDATE_ENTRY } from "../utils/mutations";
import moment from "moment";
import { useForm } from "../utils/hooks";
import Loading from "./Loading";

function EditEntry({ id, checkIn, plan, summary, update }) {
  const [errors, setErrors] = useState([]);

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

  // const UPDATE_ENTRY = gql`
  //   mutation UpdateEntry($id: ID!, $plan: String, $summary: String) {
  //     entry: updateEntry(_id: $id, plan: $plan, summary: $summary) {
  //       _id
  //       checkIn
  //       plan
  //       summary
  //     }
  //   }
  // `;

  function invokeEntryUpdate() {
    console.log("Updated invoked");
    editEntry();
  }

  const { onChange, onSubmit, values } = useForm(invokeEntryUpdate, {
    plan: plan,
    summary: summary,
  });

  useEffect(() => {
    setInterval(() => setDurationState(getDuration()), 1000);
  }, []);

  const [editEntry, { loading }] = useMutation(UPDATE_ENTRY, {
    update(_, { data: { entry: entryData } }) {
      console.log(entryData);
      update(entryData);
    },
    variables: {
      id: id,
      plan: values.plan,
      summary: values.summary,
    },
  });

  if (loading) return <Loading />;

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
              name="plan"
              className="textarea textarea-bordered w-full"
              placeholder="What do you plan to accomplish today?"
              rows="5"
              onChange={onChange}
              value={values.plan ? values.plan : ""}
            ></textarea>
          </div>
          <div>
            <label htmlFor="summary" className="label text-2xl">
              Summary
            </label>
            <textarea
              name="summary"
              className="textarea textarea-bordered w-full"
              placeholder="A summary of things..."
              rows="10"
              onChange={onChange}
              value={values.summary ? values.summary : ""}
            ></textarea>
          </div>
          <div className="flex flex-row gap-4">
            <button type="button" className="btn" onClick={onSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEntry;
