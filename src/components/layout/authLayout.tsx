import React from "react";
import HeadMetaData from "../HeadMetadata";
import { layoutProps } from "./layoutProps";
import { AuthProvider } from "@/utils/context/auth-provider";

const AuthLayout = ({ children, pageTitle }: layoutProps) => {
  return (
    <>
      <AuthProvider>
        <HeadMetaData pageTitle={pageTitle} />
        {children}
      </AuthProvider>
    </>
  );
};

export default AuthLayout;
