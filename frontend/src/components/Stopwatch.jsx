"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10); // Updated to count in 'milliseconds'
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleSave = async () => {
    setIsActive(false);
    await axios.post("/api/saveTime", { time: timer });
    setSavedTimes([...savedTimes, timer]);
    setTimer(0);
  };

  const handleReset = () => {
    setTimer(0);
    setIsActive(false);
  };

  const formatTime = () => {
    const getMilliseconds = `00${timer % 100}`.slice(-2);
    const seconds = Math.floor(timer / 100);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(timer / 6000);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 360000)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
  };

  return (
    <main>
      <div className="bg-slate-500 border-8 border-slate-600 m-4 p-2 rounded-xl h-36 w-auto flex items-center justify-center shadow-lg">
        <h1 className="timer font-digital text-7xl text-emerald-500">
          {formatTime()}
        </h1>
      </div>
      <div className="flex justify-center space-x-12">
        <button onClick={handleStart}>▶️</button>
        <button onClick={handleStop}>⏹️</button>
        <button onClick={handleSave}>💾</button>
        <button onClick={handleReset}>🔄</button>
      </div>
      <h2 className="pt-8">Saved Times</h2>
      <div className="flex justify-center">
        <ul>
          {savedTimes.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
