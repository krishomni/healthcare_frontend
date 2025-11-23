import { render, waitFor, screen } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// ---- MOCKS ----
axios.post = jest.fn();
axios.get = jest.fn();
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

// helper to access context
function TestConsumer({ callback }) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        callback(value);
        return null;
      }}
    </AuthContext.Consumer>
  );
}

describe("AuthContext", () => {
  let queryClientMock;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    queryClientMock = { clear: jest.fn() };
    useQueryClient.mockReturnValue(queryClientMock);
  });

  test("provides default context values", () => {
    let contextValue;

    render(
      <AuthProvider>
        <TestConsumer callback={(v) => (contextValue = v)} />
      </AuthProvider>
    );

    expect(contextValue.user).toBe(null);
    expect(typeof contextValue.login).toBe("function");
    expect(typeof contextValue.logout).toBe("function");
  });

  test("login updates user, token and localStorage", async () => {
    const fakeUser = { email: "test@test.com", _id: "123" };
    const fakeToken = "fakeToken123";

    axios.post.mockResolvedValue({
      data: { user: fakeUser, token: fakeToken, portfolioIds: ["abc", "xyz"] },
    });
    axios.get.mockResolvedValue({
      data: { user: fakeUser, portfolioIds: ["abc", "xyz"] },
    });

    let contextValue;

    render(
      <AuthProvider backendUrl="http://localhost:3000">
        <TestConsumer callback={(v) => (contextValue = v)} />
      </AuthProvider>
    );

    await contextValue.login("test@test.com", "password");

    // wait for the useEffect triggered by token
    await waitFor(() => expect(contextValue.user).not.toBeNull());

    expect(contextValue.user.email).toBe("test@test.com");
    expect(localStorage.getItem("token")).toBe(fakeToken);
    expect(toast.success).toHaveBeenCalledWith("Logged In!");
  });

  test("logout clears user state, token, localStorage and query cache", () => {
    localStorage.setItem("token", "abc");

    let contextValue;

    render(
      <AuthProvider>
        <TestConsumer callback={(v) => (contextValue = v)} />
      </AuthProvider>
    );

    contextValue.logout();

    expect(contextValue.user).toBe(null);
    expect(localStorage.getItem("token")).toBe(null);
    expect(queryClientMock.clear).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Logged Out!");
  });

  test("refreshUser updates the user state", async () => {
    localStorage.setItem("token", "test123");

    const fakeResponse = {
      data: { user: { email: "updated@test.com" } },
    };

    axios.get.mockResolvedValue(fakeResponse);

    let contextValue;

    render(
      <AuthProvider>
        <TestConsumer callback={(v) => (contextValue = v)} />
      </AuthProvider>
    );

    await actAsync(() => contextValue.refreshUser());

    expect(axios.get).toHaveBeenCalled();
    expect(contextValue.user.email).toBe("updated@test.com");
    expect(toast.success).toHaveBeenCalledWith("user refreshed");
  });
});

// Helper: wraps async calls the same way React Testing Library expects
async function actAsync(callback) {
  return await waitFor(callback);
}
