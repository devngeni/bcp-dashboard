import { Box, Button, Radio, Select, TableCell, styled } from "@mui/material";

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
  background: "#F3F4F6",

  "@media (max-width: 899px)": {
    width: "calc(100% - 60px)",
  },
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

export const StyledInputField = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  label: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: "14px",
    color: "#374151",
  },

  input: {
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    borderRadius: "6px",
    outline: "none",
    color: "#111827",
    height: "38px",
    padding: "9px 13px",
  },

  "& ::placeholder": {
    color: "#D1D5DB",
    fontSize: "14px",
    fontWeight: "500",
  },

  "@media screen and (max-width: 1050px)": {
    width: "100%",
  },
}));

export const StyledTextArea = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "747px",

  textarea: {
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    borderRadius: "6px",
    outline: "none",
    color: "#111827",
    padding: "9px 13px",
    resize: "vertical",
  },

  "@media screen and (max-width: 1050px)": {
    width: "100%",
  },
}));

export const StyledRoundButton = styled(Radio)(() => ({
  // padding: "0px",
  "& .MuiSvgIcon-root": {
    fontSize: 22,
  },
  "&.Mui-checked": {
    color: "#00453A",
  },
}));

export const GreenButton = styled(Button)(() => ({
  textTransform: "none",
  background: "#095F51",
  color: "#FFFFFF",
  fontFamily: "Montserrat",
  fontWeight: "500",
  fontSize: "14px",
  minHeight: "38px",

  ":hover": {
    background: "#095F51",
  },
}));

export const YelloWButton = styled(Button)(() => ({
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",
  background: "#FFA940",
  color: "#FFF",
  minHeight: "38px",
  textTransform: "none",

  ":hover": {
    background: "#FFA940",
  },
}));

export const SelectItems = styled(Select)({
  minWidth: "64px",
  width: "361.5px",
  borderRadius: "6px",
  height: "35px",
  padding: "4px 10px",

  background: "#FFFFFF",
  "&.MuiInputBase-root": {
    "& fieldset": {
      borderColor: "#D1D5DB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D1D5DB",
    },
    "& .MuiOutlinedInput-input": {
      display: "flex",
      alignItems: "center",
      padding: "0 !important",
    },
    "& .MuiSelect-icon": {
      color: "#D1D5DB",
    },
  },

  "@media screen and (max-width: 1050px)": {
    width: "100%",
  },
});
