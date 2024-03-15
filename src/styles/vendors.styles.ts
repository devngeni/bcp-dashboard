import { Box, Button, styled } from "@mui/material";

export const VendorsSubWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",

  width: "354px",
  height: "168px",
  background: "#FFF",
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "6px",

  h1: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    color: "#111827",
    fontWeight: "500",
  },

  img: {
    width: "81px",
    height: "84px",
    borderRadius: "10px",
  },
  p: {
    marginTop: "5px",
    fontFamily: "Montserrat",
    fontSize: "12px",
    lineHeight: "16px",
    color: "#6B7280",
    fontWeight: "400",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
  },
}));

interface DeleteViewButtonProps {
  toColor?: string;
}

export const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  height: "calc(100% - 119px)",
  ".buttons": {
    display: "flex",
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const DeleteViewButton = styled(Button)<DeleteViewButtonProps>(
  (props) => ({
    textTransform: "none",
    color: props.toColor ? props.toColor : "#DD0000",
    background: "transparent",
    width: "100%",
    height: "100%",
    alignItems: "center",

    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",

    "&:hover": {
      color: props.toColor ? props.toColor : "#DD0000",
    },
  })
);

export const VendorMoreDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",

  h1: {
    fontFamily: "Montserrat",
    fontSize: "20px",
    color: "#111827",
    fontWeight: "500",
    marginTop: "10px",
  },

  input: {
    fontFamily: "Montserrat",
    fontSize: "20px",
    color: "#111827",
    fontWeight: "500",
    marginTop: "10px",
    border: "none",
    background: "transparent",
    padding: "5px",
    borderRadius: "5px",

    "&:hover": {
      outline: "1px solid #111827",
    },
  },

  p: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    color: "#6B7280",
    fontWeight: "400",
    marginTop: "10px",
  },

  ".vendor_image": {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    // width: "345px",
    gap: "10px",
    height: "185px",
    borderRadius: "6px",

    img: {
      width: "345px",
      height: "100%",
      borderRadius: "6px",
      objectFit: "cover",
    },
    ".change_image_btn": {
      position: "absolute",
      top: "0",
      left: "calc(345px + 10px)",
    },
  },

  ".update_btn": {
    width: "354px",
    marginTop: "15px",
  },
}));
