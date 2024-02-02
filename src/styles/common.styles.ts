import { Box, styled } from "@mui/material";

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

export const CommonPageContainer = styled(Box)(() => ({
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
