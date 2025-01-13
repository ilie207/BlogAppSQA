import React from "react";
import Head from "next/head";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Head>
        <title>Blog with Next JS</title>
      </Head>
      <header>
        <Link className="title_styling" href="/">
          Blog with Next JS
        </Link>
      </header>
    </>
  );
};

export default Header;
