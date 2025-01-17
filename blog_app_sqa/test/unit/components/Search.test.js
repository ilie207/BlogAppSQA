import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import SearchComponent from "../../../src/app/components/Search";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      // Mock data
      Promise.resolve({
        searchResults: [
          {
            id: 1,
            title: "Test Post",
            content: "This is a test.",
            author: "Jane Doe",
            createdAt: "2025-01-01",
          },
        ],
        allPosts: [
          {
            id: 2,
            title: "Another Post",
            content: "Post cars.",
            author: "John Smith",
            createdAt: "2025-01-02",
          },
        ],
      }),
  })
);

describe("SearchComponent", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders search input and button", () => {
    render(<SearchComponent />);

    // Check if search input, select, and button are rendered
    expect(
      screen.getByPlaceholderText(/Search by title or author/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("handles search query input change", () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText(/Search by title or author/i);

    // Simulate user typing into the search input
    fireEvent.change(input, { target: { value: "Flying Cars" } });

    // Verify the search query has been updated
    expect(input.value).toBe("Flying Cars");
  });

  test("handles sort option change", () => {
    render(<SearchComponent />);
    const select = screen.getByRole("combobox");

    // Change the sort option to 'Sort by Alphabet'
    fireEvent.change(select, { target: { value: "alphabet" } });

    // Verify the sort option has been updated
    expect(select.value).toBe("alphabet");
  });

  test("fetches search results and displays them", async () => {
    render(<SearchComponent />);

    // Simulate the search button click
    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/Test Post/i));

    const searchResultsSection = within(screen.getByTestId("search-results"));

    expect(searchResultsSection.getByText(/Test Post/i)).toBeInTheDocument();
    expect(searchResultsSection.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(searchResultsSection.getByText(/1\/1\/2025/i)).toBeInTheDocument();

    const allPostsSection = within(screen.getByTestId("all-posts"));
    expect(allPostsSection.getByText(/Another Post/i)).toBeInTheDocument();
  });

  test("displays loading state when searching", () => {
    render(<SearchComponent />);

    // Simulate search button click
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Check if the loading state is shown
    expect(button).toHaveTextContent("Searching...");
  });

  test("handles no results case", async () => {
    // Mock the fetch to simulate no results
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            searchResults: [],
            allPosts: [],
          }),
      })
    );

    render(<SearchComponent />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/No results found./i));
    expect(screen.getByText(/No results found./i)).toBeInTheDocument();
  });

  test("displays 'No posts available' when no all posts are present", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            searchResults: [
              {
                id: 1,
                title: "Test Post",
                content: "This is a test.",
                author: "Jane Doe",
                createdAt: "2025-01-01",
              },
            ],
            allPosts: [],
          }),
      })
    );

    render(<SearchComponent />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/No posts available./i));
    expect(screen.getByText(/No posts available./i)).toBeInTheDocument();
  });
});
