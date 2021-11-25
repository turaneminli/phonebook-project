import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function StatusScreen() {
  const url = "http://localhost:8080/status";

  const [data, setData] = useState([]);

  const getStatus = () => {
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        const data = result;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getStatus(), []);

  return (
    <div className="container">
      <h2>Status code: {data.status}</h2>
      <h3>Status: {data.data.status}</h3>
    </div>
  );
}
