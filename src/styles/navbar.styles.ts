import { Box, Button, styled } from "@mui/material";

export const Sidebar = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  background: "#00453A",
  width: "256px",
  height: "100%",
  marginLeft: "0px",
  padding: "20px 8px 16px 8px",
  gap: "20px",
  alignItems: "center",
  alignSelf: "stretch",
}));

export const SidebarButtons = styled(Button)(() => ({
  width: "100%",
  height: "40px",
  background: "transparent",
  textTransform: "capitalize",
  fontFamily: "Montserrat",
  fontSize: "14px",
  fontStyle: "normal",
  color: "#90BDB6",
  fontWeight: 500,
  justifyContent: "flex-start",
  gap: "8px",

  ":hover": {
    background: "#095F51",
    color: "#F1BC7E",
  },

  "&.active": {
    background: "#095F51",
    color: "#F1BC7E",
  },
}));

export const Topbar = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0px 16px",
  gap: "24px",
  width: "100%",
  height: "64px",
  boxShadow:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
}));
