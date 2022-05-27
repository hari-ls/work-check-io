import { useState, useEffect } from "react";

function EndEntry(props) {
  const [rangeValue, setRangeValue] = useState(5);

  const handleChange = (event) => {
    setRangeValue(event.target.value);
  };

  //   useEffect(() => {

  //   }, []);

  return (
    <div>
      {/* <label for="my-modal-6" className="btn modal-button">
        open modal
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" /> */}
      <div className="modal modal-open modal-bottom sm:modal-middle">
        <div className="modal-box">
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
                value={rangeValue}
                className="range"
                step="1"
                onChange={handleChange}
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
                className="select w-full max-w-xs bg-base-200"
                onChange={() => {
                  console.log("changed");
                }}
              >
                <option value="HAPPY"> 😇 Happy</option>
                <option value="FROWN"> 🙁 Frown</option>
                <option value="SAD"> 😞 Sad</option>
              </select>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Done
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndEntry;
