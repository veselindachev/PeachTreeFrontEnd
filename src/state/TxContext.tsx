import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { API_BASE } from "../config";
import toast from "react-hot-toast";

export type Tx = {
  id: string;
  dateoftransfer: string;
  receivername: string;
  receiverimage: string | null;
  paymenttypeid: number;
  amount: string;
  stateid: number;
};

type CtxShape = {
  list: Tx[];
  reload: (orderBy?: string, orderDirection?: string) => Promise<void>;
  getById: (id: string) => Promise<(Tx & { state?: string }) | null>;
  updateStatus: (id: string, stateid: number) => Promise<void>;
  add: (payload: {
    sendername: string;
    receivername: string;
    amount: number;
    paymenttypeid: number;
    stateid: number;
  }) => Promise<void>;
};

const Ctx = createContext<CtxShape | null>(null);

export function TxProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [list, setList] = useState<Tx[]>([]);

  const reload = async (
    orderBy: string = "dateoftransfer",
    orderDirection: string = "DESC"
  ) => {
    if (!token) return;
    try {
      const res = await fetch(
        `${API_BASE}/transactions?orderBy=${encodeURIComponent(
          orderBy
        )}&orderDirection=${encodeURIComponent(orderDirection)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data?.ok && Array.isArray(data.transactions)) {
        setList(data.transactions);
      } else {
        setList([]);
      }
    } catch {
      toast.error("Failed to load transactions");
    }
  };

  const getById = async (id: string) => {
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data?.ok && data.details) {
        return { id, ...data.details };
      }
    } catch {
      toast.error("Failed to load details");
    }
    return null;
  };

  const updateStatus = async (id: string, stateid: number) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/updatedetails/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stateid }),
      });
      const data = await res.json();
      await reload();
    } catch {
      toast.error("State update failed");
    }
  };

  const add: CtxShape["add"] = async (payload) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/maketransfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.ok) {
        toast.success("Transfer successful");
        await reload();
      } else {
        toast.error("Transfer failed");
      }
    } catch {
      toast.error("Transfer request failed");
    }
  };

  useEffect(() => {
    if (token) reload();
  }, [token]);

  return (
    <Ctx.Provider value={{ list, reload, getById, updateStatus, add }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTx = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("TxProvider missing");
  return v;
};
