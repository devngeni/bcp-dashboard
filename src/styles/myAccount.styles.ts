import { Box, Button, styled } from "@mui/material";

export const TabsBar = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  borderBottom: "1px solid #E5E7EB",
  marginTop: "20px",
  paddingBottom: "5px",
  gap: "20px",

  ".sub_box": {
    display: "flex",
    gap: "20px",
  },
}));

export const TabButton = styled(Button)(() => ({
  position: "relative",
  color: "#6B7280",
  background: "transparent",
  textTransform: "none",
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",

  ":hover": {
    color: "#095F51",
    background: "transparent",
    fontWeight: "700",
  },

  "&.active": {
    color: "#095F51",
    fontWeight: "700",
  },

  ":before": {
    content: '""',
    position: "absolute",
    top: "calc(100% + 5px)",
    width: "100%",
    height: "2px",
    background: "#F1BC7E",
    transform: "scaleX(0)",
    transformOrigin: "left top",
    transition: "transform 0.9s ease-in-out",
  },

  "&.active::before, &:hover::before": {
    transform: "scaleX(1)",
  },
}));

export const SwitchTabsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "35px",
  padding: "25px",
  background: "#FFF",
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "6px",

  h1: {
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#111827",
    fontWeight: "500",
  },
}));

export const ChangePhotoArea = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginTop: "20px",

  label: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: "14px",
    color: "#374151",
  },
  ".the_box": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },

  ".image_area": {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#F3F4F6",

    img: {
      width: "100%",
      height: "100%",
      borderRadius: "inherit",
    },
  },
}));

export const ChangeImageButton = styled(Button)(() => ({
  textTransform: "none",
  border: "1px solid #D1D5DB",
  background: "transparent",
  color: "#374151",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "14px",

  ":hover": {
    background: "transparent",
  },
}));
