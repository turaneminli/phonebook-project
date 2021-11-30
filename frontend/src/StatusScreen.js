import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function StatusScreen() {
  const url = process.env.REACT_APP_API_URL + "/status";

  const [statusData, setStatusData] = useState([]);

  const getStatus = () => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        const statusData = response.data;
        setStatusData(statusData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getStatus(), []);

  return (
    <div className="container">
      <h2>Status code: {statusData.statusCode}</h2>
      <h3>Status: {statusData.status}</h3>
    </div>
  );
}
