import React, { useState, useRef } from "react";
import "./App.scss";
import Length from "./components/Length";
import djHorn from "./djsoundeffect.mp3";
import { Container } from "react-bootstrap";

// Current issue is that the timer is for some reason not resetting to session timer after the break timer finishes.

const App = () => {
  const [displayTime, setDisplayTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [sessionTime, setSessionTime] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const alarm = useRef();

  const playAlarm = () => {
    alarm.current.play();
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
    let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime(prev => {
            console.log(onBreakVariable);
            console.log(prev);
            if (prev <= 0 && !onBreakVariable) {
              playAlarm();
              setOnBreak(true);
              setTimeout(() => {
                onBreakVariable = true;
              }, 20);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              console.log("Making into if statement");
              playAlarm();
              setOnBreak(false);
              setTimeout(() => {
                onBreakVariable = false;
              }, 100);
              return sessionTime;
            }

            return prev - 1;
          });

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

    setOnBreak(false);
    setDisplayTime(1500);
    setBreakTime(300);
    setSessionTime(1500);
  };

  return (
    <div className="App">
      <Container>
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
          {timerOn ? (
            <i class="fas fa-pause-circle"></i>
          ) : (
            <i class="fas fa-play-circle"></i>
          )}
        </button>
        <button id="reset" onClick={resetTime}>
          <i class="fas fa-history"></i>
        </button>
        <audio id="beep" ref={alarm} src={djHorn}></audio>
      </Container>

      <footer>Created By Taanileka Maama</footer>
    </div>
  );
};

export default App;
