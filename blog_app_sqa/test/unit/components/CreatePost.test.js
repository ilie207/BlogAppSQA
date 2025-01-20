import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CreatePost from "../../../src/app/components/CreatePost";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

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

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  it("submits form data with user information", async () => {
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

    fireEvent.click(getByText("Create Post"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/allPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Title",
          content: "Test Content",
          author: "Test Author",
          user_email: "test@example.com",
        }),
      });
    });
  });
});
