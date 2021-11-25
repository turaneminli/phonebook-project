import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./HomeScreen";
import StatusScreen from "./StatusScreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/status" element={<StatusScreen />} />
        <Route exact path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
