import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import CreatePost from "../../src/app/components/CreatePost";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CreatePost Component", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    global.fetch = jest.fn();
  });

  it("renders form inputs and submit button", () => {
    render(<CreatePost />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create post/i })
    ).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true });
    render(<CreatePost />);

    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Content");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    await fireEvent.submit(
      screen.getByRole("button", { name: /create post/i })
    );

    expect(global.fetch).toHaveBeenCalledWith("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Title", content: "Test Content" }),
    });
    //expect(mockRouter.push).toHaveBeenCalledWith("/");
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
