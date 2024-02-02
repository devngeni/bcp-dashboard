import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout";
import { CommonWrapper } from "@/styles/common.styles";

const MyAccount: NextPageWithLayout = () => {
  return (
    <CommonWrapper>
      <h1>My Account</h1>
    </CommonWrapper>
  );
};

MyAccount.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | My Account">{page}</Layout>;
};

export default MyAccount;
