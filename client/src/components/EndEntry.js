import { useState, useEffect } from "react";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { CHECKOUT } from "../utils/mutations";
import moment from "moment";
import Loading from "./Loading";
import Error from "./Error";

function EndEntry({ id, plan, summary, checkOut, finalise }) {
  const [errors, setErrors] = useState([]);

  function invokeEntryCheckout() {
    console.log("Invoke checkout!");
    endEntry();
  }

  const { onChange, onSubmit, values } = useForm(invokeEntryCheckout, {
    productivity: 5,
    mood: "HAPPY",
  });

  const timeStamp = () => moment().format();

  const [endEntry, { loading, data }] = useMutation(CHECKOUT, {
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      id,
      productivity: Number(values.productivity),
      mood: values.mood,
      end: timeStamp(),
      plan,
      summary,
    },
  });

  useEffect(() => {
    if (data) {
      checkOut();
    }
  }, [data, checkOut]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="modal modal-open modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              finalise(false);
            }}
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">Finalise entry</h3>
          <p className="py-4">
            Please enter the following information and click checkout to
            confirm!
          </p>
          <div className="flex flex-col w-full gap-4">
            <label className="label">Productivity</label>
            <div>
              <input
                type="range"
                name="productivity"
                min="1"
                max="10"
                value={values.productivity}
                className="range"
                step="1"
                onChange={onChange}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
            <div>
              <label className="label">Mood</label>
              <select
                name="mood"
                className="select w-full max-w-xs bg-base-200"
                onChange={onChange}
              >
                <option value="HAPPY"> 😇 Happy</option>
                <option value="FROWN"> 🙁 Frown</option>
                <option value="SAD"> 😞 Sad</option>
              </select>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn" onClick={onSubmit}>
              Done
            </label>
          </div>
        </div>
      </div>
      {errors.map((error) => {
        return <Error message={error.message} />;
      })}
    </div>
  );
}

export default EndEntry;
