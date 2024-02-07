import React from "react";
import HeadMetaData from "../HeadMetadata";
import { layoutProps } from "./layoutProps";
import { AuthProvider } from "@/utils/context/auth-provider";

const AuthLayout = ({ children, pageTitle }: layoutProps) => {
  return (
    <>
      <HeadMetaData pageTitle={pageTitle} />
      {children}
    </>
  );
};

export default AuthLayout;
