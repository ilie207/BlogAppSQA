"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const Stats = () => {
  const [stats, setStats] = useState({
    average: 0,
    median: 0,
    maximum: 0,
    minimum: 0,
    total: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/posts"); // Replace with the correct API route
      const posts = await response.json();

      if (response.ok && posts.length > 0) {
        const characterCounts = posts.map((post) => post.content.length);
        const total = characterCounts.reduce((a, b) => a + b, 0);
        const average = total / characterCounts.length;
        const sortedCounts = [...characterCounts].sort((a, b) => a - b);
        const median =
          sortedCounts.length % 2 === 0
            ? (sortedCounts[sortedCounts.length / 2 - 1] +
                sortedCounts[sortedCounts.length / 2]) /
              2
            : sortedCounts[Math.floor(sortedCounts.length / 2)];
        const maximum = Math.max(...characterCounts);
        const minimum = Math.min(...characterCounts);

        setStats({
          average: average.toFixed(2),
          median,
          maximum,
          minimum,
          total,
        });
      } else {
        console.error("Failed to fetch posts:", posts.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <main>
        <h2>Post Statistics</h2>
        <ul>
          <li className="statistic_list">
            Average Characters: {stats.average}
          </li>
          <li className="statistic_list">Median Characters: {stats.median}</li>
          <li className="statistic_list">
            Maximum Characters: {stats.maximum}
          </li>
          <li className="statistic_list">
            Minimum Characters: {stats.minimum}
          </li>
          <li className="statistic_list">
            {" "}
            Total characters length of all posts: {stats.total}
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Stats;
