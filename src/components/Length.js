import React from "react";

const Length = ({ title, changeTime, type, time, formatLengthTimes }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <button onClick={() => changeTime(-60, type)}>Down</button>
        <h3>{formatLengthTimes(time)}</h3>
        <button onClick={() => changeTime(60, type)}>Up</button>
      </div>
    </div>
  );
};

export default Length;
