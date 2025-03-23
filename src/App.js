/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        Developed by{" "}
        <a target="_blank" href="https://sharifs-portfolio.vercel.app/">
          Sharif Hasan
        </a>{" "}
      </div>
    </React.Fragment>
  );
}

export default App;
