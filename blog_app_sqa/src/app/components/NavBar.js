import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="container-style">
        <Link href="/" className="custom_button">
          Home
        </Link>
        <Link href="/createPost" className="custom_button">
          Create Post
        </Link>
        <Link href="/stats" className="custom_button">
          Stats
        </Link>
      </ul>
    </nav>
  );
}
