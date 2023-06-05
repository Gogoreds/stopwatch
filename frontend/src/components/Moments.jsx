"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Moments() {
  const [Moments, setMoments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/Moments")
      .then((response) => {
        setMoments(response.data);
      })
      .catch((error) => {
        console.error("There seems to be a problem: ", error);
      });
  }, []);

  return (
    <div>
      <h2 className="pt-8">Saved Times</h2>
      <div className="flex justify-center">
        <ul>
          {Moments.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
