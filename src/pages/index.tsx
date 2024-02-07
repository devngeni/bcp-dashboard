import { useState } from "react";
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
import React, { ReactElement } from "react";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import AuthLayout from "@/components/layout/authLayout";
import { useAuth } from "@/utils/context/auth-provider";

export interface Icredentials {
  email: string;
  password: string;
}

const renderSocialButton = (IconComponent: any, color: any) => (
  <ButtonSignIn>
    <IconComponent sx={{ color: color }} />
  </ButtonSignIn>
);

const SignIn: NextPageWithLayout = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Icredentials>({
    email: "",
    password: "",
  });

  //from useAuth provider
  const { login } = useAuth();

  const { email, password } = credentials;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== "" || password !== "") {
      const results = (await login(credentials)) as any;
      if (results.error) {
        alert(results.error);
      }
    } else {
      console.log("fill in the fields");
      return;
    }
  };

  return (
    <SignInContainer>
      <SignInNav>
        <header>BETTER CALL PAUL</header>
      </SignInNav>
      <form onSubmit={handleSubmit}>
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
            {/* <StyledInputField sx={{ width: "100%" }}>
              <input type="text" placeholder="Full name" />
            </StyledInputField> */}
            <StyledInputField sx={{ width: "100%" }}>
              <input
                value={email}
                name="email"
                onChange={handleChange}
                type="text"
                placeholder="Email"
              />
            </StyledInputField>
            <StyledInputField sx={{ width: "100%" }}>
              <input
                value={password}
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
              />
            </StyledInputField>
            <GreenButton
              sx={{ width: "100%" }}
              //             onClick={() => router.push("/dashboard")}
              type="submit"
            >
              {/* Create your account */}
              Login
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
              By signing up, you agree to our <span>Terms, Data Policy</span>{" "}
              and <span>Cookies Policy.</span>
            </Box>
          </TC_Box>
        </SignInForm>
      </form>
    </SignInContainer>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout pageTitle="Better call paul">{page}</AuthLayout>;
};

export default SignIn;
