import { Box, Button, styled } from "@mui/material";

export const Sidebar = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  background: "#00453A",
  width: "256px",
  height: "100%",
  marginLeft: "0px",
  padding: "20px 8px 16px 8px", //top right bottom left
  gap: "8px",
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
  zIndex: 100,
  boxShadow:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
}));

export const SearchBar = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: "#FFFFFF",
  width: "calc(100% - 108px)",
  height: "100%",
  padding: "0px 16px",
  gap: "8px",

  input: {
    border: "none",
    background: "transparent",
    outline: "none",
    width: "100%",
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Inter",
  },

  "input::placeholder": {
    color: "#6B7280",
  },
}));

type NotificationProps = {
  open?: boolean;
};

export const Notification_User_Box = styled(Box)<NotificationProps>(
  (props) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "108px",
    height: "100%",
    margin: "0 0 0 auto",

    ".notification_icon": {},

    ".user_icon": {
      img: {
        borderRadius: "50%",
        width: "32px",
        height: "32px",
      },
    },

    ".arrow": {
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      transform: props.open ? "rotate(180deg)" : "rotate(0deg)",
    },
  })
);
