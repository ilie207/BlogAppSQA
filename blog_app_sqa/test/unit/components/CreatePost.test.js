import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CreatePost from "../../../src/app/components/CreatePost";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import "@testing-library/jest-dom";

jest.mock("@kinde-oss/kinde-auth-nextjs", () => ({
  useKindeAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("CreatePost Component", () => {
  beforeEach(() => {
    useKindeAuth.mockImplementation(() => ({
      user: {
        email: "test@example.com",
        id: "123",
      },
    }));
  });

  it("handles successful form submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    const { getByPlaceholderText, getByText } = render(<CreatePost />);

    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "Valid Title" },
    });
    fireEvent.change(getByPlaceholderText("Content"), {
      target: { value: "Valid Content" },
    });
    fireEvent.change(getByPlaceholderText("Author"), {
      target: { value: "Valid Author" },
    });

    fireEvent.submit(getByText("Create Post"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/allPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Valid Title",
          content: "Valid Content",
          author: "Valid Author",
          user_email: "test@example.com",
        }),
      });
    });
  });

  it("handles form validation errors", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <CreatePost />
    );

    // Submit empty form
    fireEvent.submit(getByText("Create Post"));

    // Check for validation error messages
    const titleError = await findByText(
      "Title must be between 1 and 255 characters"
    );
    const contentError = await findByText("Content cannot be empty");
    const authorError = await findByText(
      "Author name must be between 1 and 100 characters"
    );

    expect(titleError).toBeInTheDocument();
    expect(contentError).toBeInTheDocument();
    expect(authorError).toBeInTheDocument();
  });

  it("handles server error response", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Server error" }),
      })
    );

    const { getByPlaceholderText, getByText } = render(<CreatePost />);

    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByPlaceholderText("Content"), {
      target: { value: "Test Content" },
    });
    fireEvent.change(getByPlaceholderText("Author"), {
      target: { value: "Test Author" },
    });

    fireEvent.submit(getByText("Create Post"));

    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });

  it("initializes with empty user_id when no user is present", () => {
    useKindeAuth.mockImplementation(() => ({
      user: null,
    }));

    render(<CreatePost />);
  });

  it("handles server error without error message", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        // Triggering fallback error message
        json: () => Promise.resolve({}),
      })
    );

    const { getByPlaceholderText, getByText, findByText } = render(
      <CreatePost />
    );

    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByPlaceholderText("Content"), {
      target: { value: "Test Content" },
    });
    fireEvent.change(getByPlaceholderText("Author"), {
      target: { value: "Test Author" },
    });

    fireEvent.submit(getByText("Create Post"));

    const errorMessage = await findByText("Failed to create post");
    expect(errorMessage).toBeInTheDocument();
  });
});
