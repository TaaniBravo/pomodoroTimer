import React, { useState } from "react";
import "./App.css";
import Length from "./components/Length";
import djHorn from "./djsoundeffect.mp3";

const App = () => {
  const [displayTime, setDisplayTime] = useState(3);
  const [breakTime, setBreakTime] = useState(3);
  const [sessionTime, setSessionTime] = useState(3);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [alarm, setAlarm] = useState(new Audio(djHorn));

  const playAlarm = () => {
    alarm.currentTime = 0;
    alarm.play();
  };

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
      if (breakTime >= 60 * 60 && amount > 0) return;
      setBreakTime(prev => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) return;
      if (sessionTime >= 60 * 60 && amount > 0) return;
      setSessionTime(prev => prev + amount);
      if (!timerOn) setDisplayTime(sessionTime + amount);
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    // let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime(prev => {
            if (prev <= 0 && !onBreak) {
              playAlarm();
              // onBreakVariable = true;
              setOnBreak(true);
              date = new Date().getTime();
              return breakTime;
            } else if (prev <= 0 && onBreak) {
              console.log("Should be switching away from the break", onBreak);
              playAlarm();
              // onBreakVariable = false;
              setOnBreak(false);
              resetTime();
              return sessionTime;
            }

            return prev - 1;
          });

          console.log("Next Date: ", nextDate);
          console.log("Date: ", date);

          nextDate += second;
        }
      }, 30);

      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (timerOn) clearInterval(localStorage.getItem("interval-id"));

    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    if (timerOn) clearInterval(localStorage.getItem("interval-id"));
    console.log("Hello after your break.");
    setDisplayTime(1500);
    setBreakTime(300);
    setSessionTime(1500);
  };

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <div className="length-container">
        <Length
          id={"break-label"}
          title="Break Length"
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
          formatLengthTimes={formatLengthTimes}
        />
        <Length
          id={"session-label"}
          title="Session Length"
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
          formatLengthTimes={formatLengthTimes}
        />
      </div>
      <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
      <h1 id="time-left">{formatTime(displayTime)}</h1>
      <button id="start_stop" onClick={controlTime}>
        {timerOn ? "Pause" : "Play"}
      </button>
      <button id="reset" onClick={resetTime}>
        Reset
      </button>
      <audio id="beep" src={djHorn}></audio>
    </div>
  );
};

export default App;
