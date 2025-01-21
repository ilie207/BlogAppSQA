import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import BlogPost from "../../../src/app/components/BlogPost";
import { getCurrentUser } from "../../../src/app/actions/actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../src/app/actions/actions", () => ({
  getCurrentUser: jest.fn(() => Promise.resolve({ email: "test@example.com" })),
}));

describe("BlogPost Component", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  const mockPost = {
    id: "123",
    title: "Test Post",
    content: "Test Content",
    author: "Test Author",
    createdAt: "2023-01-01",
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    global.fetch = jest.fn();
    const mockReload = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: mockReload },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders post content correctly", async () => {
    render(<BlogPost post={mockPost} />);

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.content)).toBeInTheDocument();
      expect(
        screen.getByText(`Author: ${mockPost.author}`)
      ).toBeInTheDocument();
    });
  });

  test("shows edit and delete buttons when user is creator", async () => {
    getCurrentUser.mockResolvedValue({ email: mockPost.user_email });

    render(<BlogPost post={mockPost} />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /delete/i })
      ).toBeInTheDocument();
    });
  });

  test("hides edit and delete buttons when user is not creator", async () => {
    getCurrentUser.mockResolvedValue({ email: "different@email.com" });

    render(<BlogPost post={mockPost} />);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /edit/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /delete/i })
      ).not.toBeInTheDocument();
    });
  });

  test("navigates to edit page when edit button is clicked", async () => {
    getCurrentUser.mockResolvedValue({ email: mockPost.user_email });

    render(<BlogPost post={mockPost} />);

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /edit/i }));
      expect(mockRouter.push).toHaveBeenCalledWith(
        `/editPost?id=${mockPost.id}`
      );
    });
  });
});
