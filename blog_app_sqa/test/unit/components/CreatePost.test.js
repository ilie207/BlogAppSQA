import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import CreatePost from "../../../src/app/components/CreatePost";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@kinde-oss/kinde-auth-nextjs", () => ({
  useKindeAuth: jest.fn(),
}));

describe("CreatePost Component", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  const mockUser = {
    id: "test-user-id",
    email: "test@example.com",
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    useKindeAuth.mockReturnValue({ user: mockUser });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  it("submits form data with user information", async () => {
    render(<CreatePost />);

    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Content");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    await fireEvent.submit(
      screen.getByRole("button", { name: /create post/i })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/allPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Title",
          content: "Test Content",
          author: "test@example.com",
          user_id: "test-user-id",
        }),
      });
      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });
});
