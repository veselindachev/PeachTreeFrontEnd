import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../src/state/AuthContext";
import { mockLoginSuccess, mockLoginFailure } from "./mocks/handlers";

function Consumer() {
  const { login, isLoggedIn } = useAuth();
  React.useEffect(() => {
    (async () => {
      await login("user", "pass");
    })();
  }, []);
  return <div data-testid="status">{String(isLoggedIn)}</div>;
}

describe("AuthContext", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("logs in successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(mockLoginSuccess() as any);
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("status").textContent).toBe("true")
    );
  });

  it("fails login", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(mockLoginFailure() as any);
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("status").textContent).toBe("false")
    );
  });
});
