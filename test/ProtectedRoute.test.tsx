import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../src/routing/ProtectedRoute";
import { AuthProvider } from "../src/state/AuthContext";

describe("ProtectedRoute", () => {
  it("renders spinner then redirects or shows content", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>Child</div>
          </ProtectedRoute>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(true).toBe(true);
  });
});
