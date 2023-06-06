"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Moments() {
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    const fetchSavedTimes = async () => {
      const res = await axios.get("/api/savedTimes");
      setSavedTimes(res.data);
    };
    fetchSavedTimes();
  }, []);

  return (
    <div>
      <h2>Saved Times</h2>
      <ul>
        {savedTimes.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
    </div>
  );
}
