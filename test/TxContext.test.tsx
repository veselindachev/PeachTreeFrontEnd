import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { TxProvider, useTx } from "../src/state/TxContext";
import { AuthProvider } from "../src/state/AuthContext";
import {
  mockTransactions,
  mockDetails,
  mockUpdated,
  mockTransferOk,
} from "./mocks//handlers";

function Wrapper({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    localStorage.setItem("auth-token", "t");
    localStorage.setItem("auth-username", "u");
  }, []);
  return (
    <AuthProvider>
      <TxProvider>{children}</TxProvider>
    </AuthProvider>
  );
}

describe("TxContext", () => {
  afterEach(() => vi.restoreAllMocks());

  it("loads transactions", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      mockTransactions() as any
    );
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    await waitFor(() => {});
  });

  it("gets details and updates status", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(mockDetails() as any)
      .mockResolvedValueOnce(mockUpdated() as any)
      .mockResolvedValueOnce(mockTransactions() as any);
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    await waitFor(() => {});
  });

  it("adds transfer", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(mockTransferOk() as any)
      .mockResolvedValueOnce(mockTransactions() as any);
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    await waitFor(() => {});
  });
});
