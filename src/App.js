import React from "react";
import "./style.css";

export default function App() {
  return (
    <div className="app">
      <header>
      <h1>Snap Shot</h1>
      <input className="search-box" placeholder="Search Image"/>
      <p className="trending-container"> 
      <span className="trending-static">Trending: <span className="trending-topics">Beautiful, Cars, books</span></span>
      </p>
      </header>
    </div>
  );
}
