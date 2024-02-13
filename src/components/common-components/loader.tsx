import React from "react";
import { Box, keyframes, styled } from "@mui/material";

const LoaderSpinner = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SpinnerBox = styled(Box)(() => ({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: "2px solid #fff",
  backgroundColor: "transparent",
  borderTop: "2px solid transparent",
}));

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the spinning icon
const SpinningIcon = styled(SpinnerBox)`
  animation: ${spin} 1s linear infinite; /* Apply the spin animation */
`;

const Loader = () => {
  return (
    <LoaderSpinner>
      <SpinningIcon />
    </LoaderSpinner>
  );
};

export default Loader;
