/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
import SavedLocations from "./savedLocation";

function App() {
  return (
    <React.Fragment>
      <div class="main-page">
        <div className="container">
          <CurrentLocation />
        </div>
        <div className="container">
          <SavedLocations />
        </div>
        <div className="footer-info">
          Developed by{" "}
          <a target="_blank" href="https://sharifs-portfolio.vercel.app/">
            Sharif Hasan
          </a>{" "}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
