import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTx, Tx } from "../state/TxContext";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import PlaceholderImg from "../assets/beneficiary-placeholder.svg";

type SortKey = "dateoftransfer" | "receivername" | "amount";

export default function TransactionsList() {
  const { list } = useTx();
  const nav = useNavigate();
  const [term, setTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("dateoftransfer");
  const [sortDir, setSortDir] = useState<"ASC" | "DESC">("DESC");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const BeneficiaryThumb: React.FC<{ tx: Tx }> = ({ tx }) => {
    const initial =
      ((tx as any).receiverimage as string | null) || PlaceholderImg;
    const [src, setSrc] = useState<string>(initial);
    return (
      <Box
        component="img"
        src={src}
        alt={`${tx.receivername} logo`}
        onError={() => setSrc(PlaceholderImg)}
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          objectFit: "cover",
          flexShrink: 0,
          bgcolor: "background.paper",
        }}
      />
    );
  };

  const sorted = useMemo(() => {
    const arr = [...list];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "dateoftransfer":
          cmp =
            new Date(a.dateoftransfer).getTime() -
            new Date(b.dateoftransfer).getTime();
          break;
        case "receivername":
          cmp = a.receivername
            .toLowerCase()
            .localeCompare(b.receivername.toLowerCase());
          break;
        case "amount":
          cmp = Number(a.amount) - Number(b.amount);
          break;
      }
      return sortDir === "ASC" ? cmp : -cmp;
    });
    return arr;
  }, [list, sortKey, sortDir]);

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return sorted;
    return sorted.filter(
      (x) =>
        x.receivername.toLowerCase().includes(t) ||
        String(x.amount).includes(t) ||
        new Date(x.dateoftransfer)
          .toLocaleDateString()
          .toLowerCase()
          .includes(t)
    );
  }, [sorted, term]);

  const open = (t: Tx) => nav(`/dashboard/details/${t.id}`);

  const formatCurrency = (n: string) => {
    const num = Number(n);
    return `-$${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const labelFor = (key: SortKey) =>
    key === "dateoftransfer"
      ? "DATE"
      : key === "receivername"
      ? "BENEFICIARY"
      : "AMOUNT";

  const onSortBtnClick = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortKey(key);
      setSortDir("DESC");
    }
  };

  const paymentTypeLabel = (id: number) => {
    switch (id) {
      case 1:
        return "Card Payment";
      case 2:
        return "Online Transfer";
      case 3:
        return "General Transaction";
      default:
        return `Payment type #${id}`;
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        mb={2}
      >
        <TextField
          placeholder="Search…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          sx={{ maxWidth: 360 }}
          fullWidth
        />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
        >
          <Typography variant="body2" fontWeight={600}>
            Sort By
          </Typography>

          {(["dateoftransfer", "receivername", "amount"] as SortKey[]).map(
            (key) => {
              const isActive = sortKey === key;
              const EndIcon = isActive
                ? sortDir === "ASC"
                  ? ArrowUpward
                  : ArrowDownward
                : undefined;

              return (
                <Button
                  key={key}
                  variant={isActive ? "contained" : "outlined"}
                  size="small"
                  onClick={() => onSortBtnClick(key)}
                  endIcon={EndIcon ? <EndIcon fontSize="small" /> : undefined}
                  sx={{ fontWeight: 700 }}
                >
                  {labelFor(key)}
                </Button>
              );
            }
          )}
        </Stack>
      </Stack>

      {isMobile ? (
        <Stack spacing={1.5}>
          {filtered.map((t) => (
            <Card key={t.id} onClick={() => open(t)} sx={{ cursor: "pointer" }}>
              <CardContent>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <BeneficiaryThumb tx={t} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {t.receivername}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(t.dateoftransfer).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {paymentTypeLabel(t.paymenttypeid)}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Typography variant="subtitle2">
                      {formatCurrency(t.amount)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Beneficiary
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Amount
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow
                  hover
                  key={t.id}
                  onClick={() => open(t)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {new Date(t.dateoftransfer).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <BeneficiaryThumb tx={t} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography fontWeight={600} noWrap>
                          {t.receivername}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {paymentTypeLabel(t.paymenttypeid)}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(t.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
