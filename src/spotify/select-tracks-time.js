const SelectTracksTime = ({ time, setTime, id }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="btn-group" role="group">
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id={id * 2}
          onClick={() => setTime("short")}
        />
        <label
          className={`btn ${
            time === "short" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor={id * 2}
        >
          Last Month
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id={id * 3}
          onClick={() => setTime("medium")}
        />
        <label
          className={`btn ${
            time === "medium" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor={id * 3}
        >
          Last 6 Months
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id={id * 4}
          onClick={() => setTime("long")}
        />
        <label
          className={`btn ${
            time === "long" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor={id * 4}
        >
          All Time
        </label>
      </div>
    </div>
  );
};

export default SelectTracksTime;
