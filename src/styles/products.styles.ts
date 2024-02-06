import { Box, Checkbox, styled } from "@mui/material";

interface ProductsContainerProps {
  open?: boolean;
  checked?: boolean;
}

export const ProductsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",

  ".searchProduct_box": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "385px",
    height: "38px",
    border: "1px solid #D1D5DB",
    borderRadius: "6px",
    padding: "0px 16px",

    input: {
      outline: "none",
      border: "none",
      height: "100%",
      padding: "0px 16px",
    },
  },
}));

export const TopLevel = styled(Box)<ProductsContainerProps>((props) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "24px",

  ".arrow": {
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    transform: props.open ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export const SortBox = styled(Box)<ProductsContainerProps>((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  width: "115px",
  height: "100%",
  borderLeft: "1px solid #D1D5DB",
  padding: "0px 16px",

  ".sort_text": {
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "400",
  },
  ".sort_arrow": {
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    transform: props.open ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export const ProductsTable = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "24px",
  paddingBottom: "80px",
}));

export const BottomNav = styled(Box)(() => ({
  position: "fixed",
  right: "0",
  top: "calc(100% - 70px)",
  width: "calc(100% - 256px)",
  height: "60px",
  background: "#FFF",
  padding: "0px 24px",

  ".pagination_box": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "2px solid #D1D5DB",
    width: "100%",
    height: "38px",
    position: "relative",
  },

  ".page_numbers": {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },

  ".pagination_text": {
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "400",
    color: "#6B7280",
  },
}));

export const PaginationBtn = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "38px",
  height: "38px",

  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",
  color: "#6B7280",

  cursor: "pointer",

  "&.activePage": {
    borderTop: "2px solid #00453A",
    color: "#00453A",
  },
});

export const StyledCheckBox = styled(Checkbox)(() => ({
  color: "#D1D5DB",
  padding: "0 !important",

  "&.Mui-checked": {
    color: "#FFA940",
  },
}));

export const ProductItemBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  width: "200px",
  justifyContent: "space-between",
  gap: "10px",

  ".image_box": {
    width: "48px",
    height: "48px",
    img: {
      width: "100%",
      height: "100%",
    },
  },

  ".product_name": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    h1: {
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: "Montserrat",
      color: "#00453A",
    },
    p: {
      fontSize: "10px",
      fontWeight: "400",
      fontFamily: "Inter",
      color: "#6B7280",
    },
  },
}));

export const UploadProductPicture = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  width: "747px",
  height: "180px",
  marginTop: "40px",
  marginBottom: "40px",

  ".upload_box": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    border: "1px dashed #D1D5DB",
    borderRadius: "6px",
    cursor: "pointer",
    height: "100%",
  },
  ".upload_text": {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    color: "#6B7280",
  },

  ".small_size": {
    fontWeight: "400",
    fontSize: "12px",
  },
  span: {
    color: "#4F46E5",
    cursor: "pointer",
  },

  ".selected-file": {
    fontStyle: "italic",
    fontFamily: "Inter",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "300",
  },

  "@media screen and (max-width: 1050px)": {
    width: "100%",
  },
}));
