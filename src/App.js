import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [displayTime, setDisplayTime] = useState(1500);

  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  return <div className="App">{formatTime(displayTime)}</div>;
};

export default App;
