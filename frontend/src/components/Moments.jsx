"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Moments() {
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    const fetchSavedTimes = async () => {
      const res = await axios.get("http://localhost:5000/api/savedTimes");
      setSavedTimes(res.data);
    };
    fetchSavedTimes();
  }, []);

  const formatTime = (time) => {
    let milliseconds = Math.floor(time % 100);
    let seconds = Math.floor((time / 100) % 60);
    let minutes = Math.floor((time / (100 * 60)) % 60);
    let hours = Math.floor((time / (100 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-4">Saved Times</h2>
      <div className="flex justify-center">
        <ul className="border-2 border-dashed border-slate-500 p-4 rounded-md w-72">
          {savedTimes.map((time) => (
            <li key={time._id} className="mb-2">
              {formatTime(time.time)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
