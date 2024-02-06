import { GreenButton, StyledInputField } from "@/styles/common.styles";
import {
  ButtonSignIn,
  DividerLine,
  SignInContainer,
  SignInForm,
  SignInNav,
  SocialItemsSignIn,
  TC_Box,
} from "@/styles/sign-in.styles";
import { Box } from "@mui/material";
import React from "react";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import { useRouter } from "next/router";

const renderSocialButton = (IconComponent: any, color: any) => (
  <ButtonSignIn>
    <IconComponent sx={{ color: color }} />
  </ButtonSignIn>
);

const SignIn = () => {
  const router = useRouter();

  return (
    <SignInContainer>
      <SignInNav>
        <header>BETTER CALL PAUL</header>
      </SignInNav>

      <SignInForm>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "50px 20px 40px 20px",
          }}
        >
          <header>Sign in as admin</header>
          <StyledInputField sx={{ width: "100%" }}>
            <input type="text" placeholder="Full name" />
          </StyledInputField>
          <StyledInputField sx={{ width: "100%" }}>
            <input type="text" placeholder="Mobile number or email" />
          </StyledInputField>
          <StyledInputField sx={{ width: "100%" }}>
            <input type="text" placeholder="Password" />
          </StyledInputField>
          <GreenButton
            sx={{ width: "100%" }}
            onClick={() => router.push("/dashboard")}
          >
            Create your account
          </GreenButton>

          <DividerLine>
            <Box className="line">
              <Box className="Or">Or</Box>
            </Box>
          </DividerLine>
          <SocialItemsSignIn>
            <header className="header">Sign in with</header>
            {renderSocialButton(FacebookRoundedIcon, "#6B7280")}
            {renderSocialButton(XIcon, "#6B7280")}
          </SocialItemsSignIn>
        </Box>
        <TC_Box>
          <Box className="text">
            By signing up, you agree to our <span>Terms, Data Policy</span> and{" "}
            <span>Cookies Policy.</span>
          </Box>
        </TC_Box>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;
