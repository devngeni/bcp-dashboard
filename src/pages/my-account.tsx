import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout";
import { CommonPageContainer } from "@/styles/common.styles";

const MyAccount: NextPageWithLayout = () => {
  return (
    <CommonPageContainer>
      <h1>My Account</h1>
    </CommonPageContainer>
  );
};

MyAccount.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | My Account">{page}</Layout>;
};

export default MyAccount;
