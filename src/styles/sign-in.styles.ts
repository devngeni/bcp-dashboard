import { Box, Button, styled } from "@mui/material";

export const SignInContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  alignItems: "center",

  form: {
    padding: "0px auto",
  },

  "@media (max-width: 599px)": {
    form: {
      width: "95%",
    },
  },
}));

export const SignInNav = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  //   justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "64px",
  padding: "25px",
  background: "#095F51",

  header: {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Inter",
    color: "#FFFFFF",
  },
}));

export const SignInForm = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "448px",
  height: "auto",
  alignItems: "center",
  boxShadow: "0px 4px 8px 0px #00000014",
  marginTop: "40px",
  borderRadius: "8px",

  header: {
    fontSize: "24px",
    fontWeight: "800",
    fontFamily: "Montserrat",
    color: "#111827",
  },

  "@media (max-width: 599px)": {
    width: "100%",
  },
}));

export const DividerLine = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  marginTop: "15px",

  "& .line": {
    width: "100%",
    height: "1px",
    background: "#D1D5DB",
  },

  "& .Or": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    width: "38px",
    heigth: "38px",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Inter",
    color: "#6B7280",
  },
}));

export const SocialItemsSignIn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "20px",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "35px",
  position: "relative",

  ".header": {
    position: "absolute",
    bottom: "calc(100% + 15px)",
    left: "0",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#111827",
  },
}));

export const ButtonSignIn = styled(Button)(() => ({
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  height: "38px",
  width: "178px",

  "&:hover": {
    background: "#FFFFFF",
  },

  "@media (max-width: 599px)": {
    width: "100%",
  },
}));

export const TC_Box = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  background: "#F9FAFB",
  borderTop: "1px solid #D1D5DB",
  padding: "35px",

  ".text": {
    fontSize: "12px",
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#6B7280",
    lineHeight: "20px",

    span: {
      color: "#111827",
      cursor: "pointer",
    },
  },
}));
