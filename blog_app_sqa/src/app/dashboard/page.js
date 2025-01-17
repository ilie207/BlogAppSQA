"use client";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Search from "../components/Search";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <br />
        <Search />
      </main>
    </div>
  );
};

export default HomePage;
