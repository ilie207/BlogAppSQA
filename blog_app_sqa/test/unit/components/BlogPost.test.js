import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogPost from "../../../src/app/components/BlogPost";

jest.mock("../../../src/app/actions/actions", () => ({
  getCurrentUser: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  refresh: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("BlogPost Component", () => {
  const mockPost = {
    id: "123",
    title: "Test Post",
    content: "1. Test Content",
    author: "Test Author",
    user_email: "test@example.com",
    createdAt: "2023-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("User Authorization", () => {
    it("renders null when user is not post creator", async () => {
      const { getCurrentUser } = require("../../../src/app/actions/actions");
      getCurrentUser.mockResolvedValue({ email: "different@example.com" });
      const { container } = render(<BlogPost post={mockPost} />);
      expect(container.firstChild).toBeNull();
    });

    it("checks creator status and returns null", async () => {
      const { getCurrentUser } = require("../../../src/app/actions/actions");
      getCurrentUser.mockResolvedValue({ email: "different@example.com" });
      const { container } = render(<BlogPost post={mockPost} />);
      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });

  describe("Post Management", () => {
    it("handles post deletion successfully", async () => {
      const { getCurrentUser } = require("../../../src/app/actions/actions");
      getCurrentUser.mockResolvedValue({ email: mockPost.user_email });
      const { getByText } = render(<BlogPost post={mockPost} />);

      await waitFor(() => {
        fireEvent.click(getByText("Delete"));
      });
      expect(global.fetch).toHaveBeenCalled();
      expect(window.location.reload).toHaveBeenCalled();
    });

    it("handles edit button click and navigation", async () => {
      const { getCurrentUser } = require("../../../src/app/actions/actions");
      getCurrentUser.mockResolvedValue({ email: mockPost.user_email });

      const { getByRole } = render(<BlogPost post={mockPost} />);

      await waitFor(() => {
        const editButton = getByRole("button", { name: /edit/i });
        fireEvent.click(editButton);
      });

      expect(mockRouter.push).toHaveBeenCalledWith(
        `/editPost?id=${mockPost.id}`
      );
    });
  });
});
