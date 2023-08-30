const SelectTracksTime = ({ time, setTime, id }) => {
  const fontSize = { fontSize: "1.75vh" };

  return (
    <div className="d-flex justify-content-center my-2">
      <div className="btn-group" role="group">
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id={id + 1}
          onClick={() => setTime("short")}
        />
        <label
          className={`btn p-1 d-flex align-items-center ${
            time === "short" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor={id + 1}
        >
          <p className="m-0" style={fontSize}>
            Last Month
          </p>
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id={id + 2}
          onClick={() => setTime("medium")}
        />
        <label
          className={`btn p-1 ${
            time === "medium" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor={id + 2}
        >
          <p className="m-0" style={fontSize}>
            Last 6 Months
          </p>
        </label>
        <input
          type="radio"
          className="btn-check"
          name="gen-method"
          id={id + 3}
          onClick={() => setTime("long")}
        />
        <label
          className={`btn ${
            time === "long" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          htmlFor={id + 3}
        >
          <p className="m-0" style={fontSize}>
            All Time
          </p>
        </label>
      </div>
    </div>
  );
};

export default SelectTracksTime;
