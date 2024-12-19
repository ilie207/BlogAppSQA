import React from 'react';
import Link from 'next/link';

const Stats = () => {
    return (
        <div>
        <h1 className="text-right text-4xl sm:text-6xl font-bold">
          Blog with Next JS
        </h1>
        <ul className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
         <Link href="/">Home</Link>
         </li>
          <li>Create Post</li>
          <li>Stats</li>
        </ul>
            <main>
                <h2>Post Statistics</h2>
                <ul>
                    <li>Average:</li>
                    <li>Median:</li>
                    <li>Maximum:</li>
                    <li>Minimum:</li>
                    <li>Total length of all posts:</li>
                </ul>
            </main>
        </div>
    );
};

export default Stats;

