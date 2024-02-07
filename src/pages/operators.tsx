import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { CommonWrapper } from "@/styles/common.styles";
import DashBoardLayout from "@/components/layout/dashboardLayout";

const OperatorsPage: NextPageWithLayout = () => {
  return (
    <CommonWrapper>
      <h1>Operators</h1>
    </CommonWrapper>
  );
};

OperatorsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | Operators">
      {page}
    </DashBoardLayout>
  );
};

export default OperatorsPage;
