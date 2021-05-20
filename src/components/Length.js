import React from "react";

const Length = ({ id, title, changeTime, type, time, formatLengthTimes }) => {
  return (
    <div>
      <h3 id={id} style={{ marginBottom: 0, textDecoration: "underline" }}>
        {title}
      </h3>
      <div className="length-buttons">
        <button id={type + "-decrement"} onClick={() => changeTime(-60, type)}>
          <i class="fas fa-arrow-alt-circle-down"></i>
        </button>
        <h3 id={type + "-length"}>{formatLengthTimes(time)}</h3>
        <button id={type + "-increment"} onClick={() => changeTime(60, type)}>
          <i class="fas fa-arrow-alt-circle-up"></i>
        </button>
      </div>
    </div>
  );
};

export default Length;
