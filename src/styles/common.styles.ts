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
