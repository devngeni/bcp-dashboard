import { useState } from "react";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getSession,
  getCsrfToken
} from "next-auth/react";
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
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import AuthLayout from "@/components/layout/authLayout";
import { useAuth } from "@/utils/context/auth-provider";
import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import Loader from "@/components/common-components/loader";

export interface Icredentials {
  email: string;
  password: string;
}

const SignIn: NextPageWithLayout = ({ providers }: any) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    console.log(session.user);
  }

  const [credentials, setCredentials] = useState<Icredentials>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //from useAuth provider
  const { login } = useAuth();

  const { email, password } = credentials;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== "" || password !== "") {
      setIsLoading(true);
      const results = (await login(credentials)) as any;
      if (results.user) {
        toast.success("Logged in successfully");
        router.push("/dashboard");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Invalid credentials");
      }
    } else {
      setIsLoading(false);
      toast.error("Fill in all fields");
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

              "@media (max-width: 599px)": {
                width: "80%",
              },
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
            <GreenButton sx={{ width: "100%" }} type="submit">
              {isLoading ? <Loader /> : "Sign in"}
            </GreenButton>

            <DividerLine>
              <Box className="line">
                <Box className="Or">Or</Box>
              </Box>
            </DividerLine>
            <SocialItemsSignIn>
              <header className="header">Sign in with</header>
              {/* <ButtonSignIn>
                <GoogleIcon sx={{ color: "#6B7280" }} />
              </ButtonSignIn>
              <ButtonSignIn>
                <FacebookRoundedIcon sx={{ color: "#6B7280" }} />
              </ButtonSignIn> */}
              {Object.values(providers).map((provider: any) => {
                return (
                  <>
                    <ButtonSignIn onClick={() => signIn(provider.id)}>
                      {provider.name === "Facebook" ? (
                        <FacebookRoundedIcon sx={{ color: "#6B7280" }} />
                      ) : (
                        <GoogleIcon sx={{ color: "#6B7280" }} />
                      )}
                    </ButtonSignIn>
                  </>
                );
              })}
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

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/dashboard" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
