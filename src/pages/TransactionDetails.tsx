import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useTx } from "../state/TxContext";
import {
  Card,
  CardContent,
  Grid2 as Grid,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";

export default function TransactionDetails() {
  const { id } = useParams();
  const { getById, updateStatus } = useTx();
  const [tx, setTx] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    if (id)
      getById(id).then((d) => {
        if (mounted) setTx(d);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!tx) return <Typography>Loading...</Typography>;

  const onChange = async (val: string) => {
    const stateid = Number(val);
    // optimistic local update
    setTx({ ...tx, stateid, state: stateLabel(stateid) });
    try {
      await updateStatus(id!, stateid);
      toast.success("State updated");
    } catch {
      toast.error("Failed to update state");
    }
  };

  const formatAmount = (n: string) => {
    const num = Math.abs(Number(n)); // ensure we don't get double negatives if API already sends negative values
    return `-$${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Details for transaction {id}
        </Typography>
        <Grid container spacing={1}>
          <Grid size={4}>
            <Typography color="text.secondary">Amount</Typography>
          </Grid>
          <Grid size={8}>
            <Typography>{formatAmount(tx.amount)}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography color="text.secondary">Date</Typography>
          </Grid>
          <Grid size={8}>
            <Typography>
              {new Date(tx.dateoftransfer).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography color="text.secondary">To Contractor</Typography>
          </Grid>
          <Grid size={8}>
            <Typography>{tx.receivername}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography color="text.secondary">State</Typography>
          </Grid>
          <Grid size={8}>
            <Typography>
              {tx.state ? tx.state : stateLabel(tx.stateid)}
            </Typography>
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          mt={2}
        >
          <TextField
            select
            label="Change transaction state"
            value={tx.stateid}
            onChange={(e) => onChange(e.target.value)}
            sx={{ minWidth: 240 }}
          >
            <MenuItem value={1}>Send Transaction</MenuItem>
            <MenuItem value={2}>Received</MenuItem>
            <MenuItem value={3}>Payed</MenuItem>
          </TextField>
          <Button component={RouterLink} to="/dashboard">
            Back to list
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function stateLabel(id: number) {
  if (id === 1) return "Send Transaction";
  if (id === 2) return "Received";
  if (id === 3) return "Payed";
  return String(id);
}
