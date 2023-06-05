"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Moments from "./Moments";

import { CiPlay1, CiPause1, CiBookmark, CiRedo } from "react-icons/ci";

export default function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
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
      <div className="bg-slate-500 border-8 border-slate-600 px-4 p-2 rounded-xl h-36 w-auto flex items-center justify-center shadow-lg">
        <h1 className="timer font-digital text-7xl text-emerald-500">
          {formatTime()}
        </h1>
      </div>
      <div className="flex justify-center pt-8 space-x-24">
        <button onClick={handleStart}>
          <CiPlay1 className="h-10 w-5" />
        </button>
        <button onClick={handleStop}>
          <CiPause1 className="h-10 w-5" />
        </button>
        <button onClick={handleSave}>
          <CiBookmark className="h-10 w-5" />
        </button>
        <button onClick={handleReset}>
          <CiRedo className="h-10 w-5" />
        </button>
      </div>
      <div className="flex justify-center">
        <Moments />
      </div>
    </main>
  );
}
