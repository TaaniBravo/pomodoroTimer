import React from "react";

const Length = ({ id, title, changeTime, type, time, formatLengthTimes }) => {
  return (
    <div>
      <h3 id={id}>{title}</h3>
      <div>
        <button id={type + "-decrement"} onClick={() => changeTime(-60, type)}>
          Down
        </button>
        <h3 id={type + "-length"}>{formatLengthTimes(time)}</h3>
        <button id={type + "-increment"} onClick={() => changeTime(60, type)}>
          Up
        </button>
      </div>
    </div>
  );
};

export default Length;
