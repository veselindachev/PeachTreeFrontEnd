import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import TransferForm from "../pages/TransferForm";
import { TxProvider } from "../state/TxContext";
import { AuthProvider } from "../state/AuthContext";

describe("TransferForm", () => {
  it("renders inputs", () => {
    render(
      <AuthProvider>
        <TxProvider>
          <TransferForm />
        </TxProvider>
      </AuthProvider>
    );
    expect(screen.getByLabelText(/from account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
