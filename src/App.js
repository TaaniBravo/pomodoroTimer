import React, { useState } from "react";
import "./App.css";
import Length from "./components/Length";

const App = () => {
  const [displayTime, setDisplayTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [sessionTime, setSessionTime] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);

  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const formatLengthTimes = time => {
    return time / 60;
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) return;
      setBreakTime(prev => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) return;
      setSessionTime(prev => prev + amount);
      if (!timerOn) setDisplayTime(sessionTime + amount);
    }
  };

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <div className="length-container">
        <Length
          title="Break Length"
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
          formatLengthTimes={formatLengthTimes}
        />
        <Length
          title="Session Length"
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
          formatLengthTimes={formatLengthTimes}
        />
      </div>
      <h1>{formatTime(displayTime)}</h1>
    </div>
  );
};

export default App;
