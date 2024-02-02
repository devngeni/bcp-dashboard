import { Box, Button, TableCell, styled } from "@mui/material";

export const PageContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100vw",
  height: "100vh",
}));

export const MainComponent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "calc(100% - 256px)",
  height: "100%",
}));

export const CommonWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  height: "100%",
  width: "100%",

  h1: {
    fontSize: "24px",
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#111827",
  },

  header: {
    fontSize: "18px",
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#111827",
  },
}));

export const YelloWButton = styled(Button)(() => ({
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",
  background: "#FFA940",
  color: "#FFF",
  height: "38px",
  textTransform: "none",

  ":hover": {
    background: "#FFA940",
  },
}));

export const StyledTableCell = styled(TableCell)({
  color: "#6B7280",
  fontSize: "12px",
  fontFamily: "Inter",
  fontWeight: "500",

  "&.bold": {
    fontWeight: "700",
  },

  "&.small_size": {
    width: "50px !important",
  },

  "&.product_size": {
    width: "220px !important",
  },
});
