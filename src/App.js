import React, { useState, useRef } from "react";
import "./App.scss";
import Length from "./components/Length";
import djHorn from "./djsoundeffect.mp3";
import { Container } from "react-bootstrap";

// Current issue is that the timer is for some reason not resetting to session timer after the break timer finishes.

const App = () => {
  const [displayTime, setDisplayTime] = useState(5);
  const [breakTime, setBreakTime] = useState(2);
  const [sessionTime, setSessionTime] = useState(4);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const alarm = useRef();

  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 0) minutes = 0;
    if (seconds < 0) seconds = 0;

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
    // let date = new Date().getTime();
    // let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (timerOn) clearInterval(localStorage.getItem("interval-id"));

    // IF timer is off then...
    if (!timerOn) {
      // Define our interval so we can store it.
      let interval = setInterval(() => {
        // Assign our date again to a new time.
        // date = new Date().getTime();
        // If the date is still larger then the nextDate variable we are setting the displayTime to adjust for that 1 second change on the timer.

        if (displayTime >= 0) {
          setDisplayTime(prev => {
            // IF the prev time is at 0 and onBreakVariable is false then...
            if (prev <= 0 && !onBreakVariable) {
              alarm.current.play();
              setOnBreak(true);

              // setTimeout helps with delay the onBreakVariable so that the if statement is not exited early.
              setTimeout(() => {
                onBreakVariable = true;
              }, 5);

              // RETURN our break time.
              return breakTime;

              // ELSE IF the prev timer is at 0 and onBreakVariable is true then...
            } else if (prev <= 0 && onBreakVariable) {
              alarm.current.play();
              setOnBreak(false);

              // Same as the above setTimeout function.
              setTimeout(() => {
                onBreakVariable = false;
              }, 5);
              // RETURN our session time.
              return sessionTime;
            }

            return prev - 1;
          });

          // IF neither of the IF statements fit then we are return the nextDate plus 1000ms.
          // nextDate += second;
        }
      }, second);

      // We are clearing and then storing our interval so that we can call upon it easily when we want to pause the timer.
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

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
