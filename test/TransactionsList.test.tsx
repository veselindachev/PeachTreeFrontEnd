import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TransactionsList from "../src/pages/TransactionsList";
import { TxProvider } from "../src/state/TxContext";
import { AuthProvider } from "../src/state/AuthContext";
import { mockTransactions } from "./mocks//handlers";

describe("TransactionsList", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders headers", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(mockTransactions() as any);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TxProvider>
            <TransactionsList />
          </TxProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const table = await screen.findByRole("table");
    const t = within(table);

    expect(
      t.getByRole("columnheader", { name: /^date$/i })
    ).toBeInTheDocument();
    expect(
      t.getByRole("columnheader", { name: /^beneficiary$/i })
    ).toBeInTheDocument();
    expect(
      t.getByRole("columnheader", { name: /^amount$/i })
    ).toBeInTheDocument();
  });
});
