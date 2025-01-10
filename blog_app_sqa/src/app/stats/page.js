import React from "react";
import NavBar from "../components/NavBar";
import Stats from "../components/Stats";
import Header from "../components/Header";

const StatsPage = () => {
  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <Stats />
      </main>
    </div>
  );
};

export default StatsPage;
