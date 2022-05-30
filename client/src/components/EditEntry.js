import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ENTRY } from "../utils/mutations";
import moment from "moment";
import { useForm } from "../utils/hooks";
import Loading from "./Loading";
import Error from "./Error";

function EditEntry({ id, checkIn, plan, summary, update }) {
  const [errors, setErrors] = useState([]);

  const getDuration = () => {
    const startTime = moment.unix(checkIn / 1000);
    const endTime = moment();

    var hrs = moment.utc(endTime.diff(startTime)).format("HH");
    var min = moment.utc(endTime.diff(startTime)).format("mm");
    var sec = moment.utc(endTime.diff(startTime)).format("ss");

    const value = [hrs, min, sec].join(":");

    return value;
  };

  const [durationState, setDurationState] = useState(getDuration());

  function invokeEntryUpdate() {
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
      update(entryData);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
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
      <div className="flex flex-col md:flex-row justify-between py-4">
        <p>
          <strong>Check in:</strong>{" "}
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
      {errors.map(function (error) {
        return <Error message={error.message} />;
      })}
    </div>
  );
}

export default EditEntry;
