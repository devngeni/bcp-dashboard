import React from "react";
import HeadMetaData from "../HeadMetadata";
import { layoutProps } from "./layoutProps";

const AuthLayout = ({ children, pageTitle }: layoutProps) => {
  return (
    <>
      <HeadMetaData pageTitle={pageTitle} />
      {children}
    </>
  );
};

export default AuthLayout;
