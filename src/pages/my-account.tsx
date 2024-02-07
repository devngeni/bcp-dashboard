import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { CommonWrapper } from "@/styles/common.styles";
import DashBoardLayout from "@/components/layout/dashboardLayout";

const MyAccount: NextPageWithLayout = () => {
  return (
    <CommonWrapper>
      <h1>My Account</h1>
    </CommonWrapper>
  );
};

MyAccount.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | My Account">
      {page}
    </DashBoardLayout>
  );
};

export default MyAccount;
