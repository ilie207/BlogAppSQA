// Header.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../../src/app/components/Header";

jest.mock("next/head", () => {
  return function HeadMock({ children }) {
    return <>{children}</>;
  };
});

describe("Header Component", () => {
  it("renders the title in the Head element", () => {
    render(<Header />);
    const headTitle = screen.getByText("Blog with Next JS");
    expect(headTitle).toBeInTheDocument();
  });

  it("renders the header with the correct text", () => {
    render(<Header />);
    const headerTitle = screen.getByText("Blog with Next JS");
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveClass("title_styling");
  });

  it("renders a link with the correct href", () => {
    render(<Header />);
    const linkElement = screen.getByRole("link", {
      name: /blog with next js/i,
    });
    expect(linkElement).toHaveAttribute("href", "/dashboard");
  });
});
