import React from "react";
import Head from "next/head";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Header = () => {
  return (
    <>
      <Head>
        <title>Blog with Next JS</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <header>
        <Link className="title_styling" href="/dashboard">
          Blog with Next JS
        </Link>
        <div className="sign-out-wrapper">
          <LogoutLink className="sign-out">
            <span>Sign Out</span>
            <i className="fa fa-sign-out"></i>
          </LogoutLink>
        </div>
      </header>
    </>
  );
};

export default Header;
