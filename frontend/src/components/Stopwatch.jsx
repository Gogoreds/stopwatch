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
    const fetchSavedTimes = async () => {
      const res = await axios.get("http://localhost:5000/api/savedTimes");
      setSavedTimes(res.data);
    };
    fetchSavedTimes();
  }, []);

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
    const res = await axios.post("http://localhost:5000/api/savedTimes/", {
      time: timer,
    });
    setSavedTimes((prev) => [...prev, res.data]);
    setTimer(0);
  };

  const handleReset = () => {
    setTimer(0);
    setIsActive(false);
  };

  const formatTime = () => {
    let milliseconds = Math.floor(timer % 100);
    let seconds = Math.floor((timer / 100) % 60);
    let minutes = Math.floor((timer / (100 * 60)) % 60);
    let hours = Math.floor((timer / (100 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
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
        <Moments savedTimes={savedTimes} />
      </div>
    </main>
  );
}
