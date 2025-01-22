import { render, screen, act, waitFor } from "@testing-library/react";
import Stats from "../../../src/app/components/Stats";

describe("Stats Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("renders stats component with initial values", () => {
    render(<Stats />);

    expect(screen.getByText(/post statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/average characters: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/median characters: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/maximum characters: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/minimum characters: 0/i)).toBeInTheDocument();
    expect(
      screen.getByText(/total characters length of all posts: 0/i)
    ).toBeInTheDocument();
  });

  it("calculates and displays stats correctly when posts are fetched", async () => {
    const mockPosts = [
      { content: "test" },
      { content: "testing" },
      { content: "tested" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPosts),
    });

    render(<Stats />);

    await waitFor(() => {
      expect(screen.getByText(/average characters: 5.67/i)).toBeInTheDocument();
      expect(screen.getByText(/median characters: 6/i)).toBeInTheDocument();
      expect(screen.getByText(/maximum characters: 7/i)).toBeInTheDocument();
      expect(screen.getByText(/minimum characters: 4/i)).toBeInTheDocument();
      expect(
        screen.getByText(/total characters length of all posts: 17/i)
      ).toBeInTheDocument();
    });
  });

  it("handles empty posts array", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<Stats />);

    await waitFor(() => {
      expect(screen.getByText(/average characters: 0/i)).toBeInTheDocument();
      expect(screen.getByText(/median characters: 0/i)).toBeInTheDocument();
      expect(screen.getByText(/maximum characters: 0/i)).toBeInTheDocument();
      expect(screen.getByText(/minimum characters: 0/i)).toBeInTheDocument();
      expect(
        screen.getByText(/total characters length of all posts: 0/i)
      ).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<Stats />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching stats:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("handles API response with ok: false", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Something went wrong" }),
    });

    render(<Stats />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch posts:",
        "Something went wrong"
      );
    });

    consoleSpy.mockRestore();
  });

  it("logs error when posts data is malformed", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const malformedPosts = [{ text: "no content field" }];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(malformedPosts),
    });

    render(<Stats />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching stats:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
  it("validates calculations for stats from fetched posts", async () => {
    const mockPosts = [
      { content: "a" },
      { content: "abc" },
      { content: "abcde" },
      { content: "abcdefgh" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPosts),
    });

    render(<Stats />);

    await waitFor(() => {
      const average = (1 + 3 + 5 + 8) / 4;
      const sorted = [1, 3, 5, 8];
      const median = (sorted[1] + sorted[2]) / 2;
      const total = 1 + 3 + 5 + 8;

      expect(
        screen.getByText(
          new RegExp(`Average Characters: ${average.toFixed(2)}`, "i")
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Median Characters: ${median}`, "i"))
      ).toBeInTheDocument();
      expect(screen.getByText(/Maximum Characters: 8/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum Characters: 1/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Total characters length of all posts: 17/i)
      ).toBeInTheDocument();
    });
  });
});
