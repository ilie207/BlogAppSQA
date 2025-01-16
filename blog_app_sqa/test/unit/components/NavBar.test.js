import { render, screen } from "@testing-library/react";
import NavBar from "../../../src/app/components/NavBar";

describe("NavBar Component", () => {
  it("renders navigation links", () => {
    render(<NavBar />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    const createPostLink = screen.getByRole("link", { name: /create post/i });
    const statsLink = screen.getByRole("link", { name: /stats/i });
    const allPostsLink = screen.getByRole("link", { name: /all posts/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/dashboard");

    expect(createPostLink).toBeInTheDocument();
    expect(createPostLink).toHaveAttribute("href", "/createPost");

    expect(statsLink).toBeInTheDocument();
    expect(statsLink).toHaveAttribute("href", "/stats");

    expect(allPostsLink).toBeInTheDocument();
    expect(allPostsLink).toHaveAttribute("href", "/allBlogPosts");
  });

  it("applies correct CSS classes", () => {
    render(<NavBar />);

    const nav = screen.getByRole("navigation");
    const links = screen.getAllByRole("link");

    expect(nav).toBeInTheDocument();
    expect(links).toHaveLength(4);

    links.forEach((link) => {
      expect(link).toHaveClass("custom_button");
    });

    const container = nav.querySelector("ul");
    expect(container).toHaveClass("container-style");
  });
});
