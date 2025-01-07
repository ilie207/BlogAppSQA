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
        <a className="title_styling" href="/">
          Blog with Next JS
        </a>
      </header>
    </>
  );
};

export default Header;
