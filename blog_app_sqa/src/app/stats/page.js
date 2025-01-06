import React from "react";
import NavBar from "../components/NavBar";

const Stats = () => {
  return (
    <div>
      <main>
        <h1 className="text-right text-4xl sm:text-6xl font-bold">
          Blog with Next JS
        </h1>
        <NavBar />
        <h2>Post Statistics</h2>
        <ul>
          <li>Average Characters:</li>
          <li>Median Characters:</li>
          <li>Maximum Characters:</li>
          <li>Minimum Characters:</li>
          <li>Total characters length of all posts:</li>
        </ul>
      </main>
    </div>
  );
};

export default Stats;
