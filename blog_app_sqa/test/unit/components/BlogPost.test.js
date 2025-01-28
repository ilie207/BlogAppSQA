import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ csrfToken: "test-token" }),
      })
    );

    Object.defineProperty(window, "location", {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    });

    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Post Management", () => {
    it("handles post deletion successfully", async () => {
      const { getCurrentUser } = require("../../../src/app/actions/actions");
      getCurrentUser.mockResolvedValue({ email: mockPost.user_email });

      let component;
      await act(async () => {
        component = render(<BlogPost post={mockPost} />);
      });

      await act(async () => {
        fireEvent.click(component.getByText("Delete"));
      });

      await waitFor(() => {
        const fetchCalls = global.fetch.mock.calls;
        expect(fetchCalls[0][0]).toBe("/api/csrf/token");
        expect(fetchCalls[1][0]).toBe("/api/postManagement");
        expect(fetchCalls[1][1]).toEqual({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": "test-token",
          },
          body: JSON.stringify({ id: mockPost.id }),
        });
        expect(window.location.reload).toBeCalled();
      });
    });

    it("handles edit button click and navigation", async () => {
      const { getCurrentUser } = require("../../../src/app/actions/actions");
      getCurrentUser.mockResolvedValue({ email: mockPost.user_email });

      let component;
      await act(async () => {
        component = render(<BlogPost post={mockPost} />);
      });

      await act(async () => {
        fireEvent.click(component.getByText("Edit"));
      });

      await waitFor(() => {
        expect(localStorage.getItem("editCsrfToken")).toBe("test-token");
        expect(mockRouter.push).toHaveBeenCalledWith(
          `/editPost?id=${mockPost.id}`
        );
      });
    });
  });
});
