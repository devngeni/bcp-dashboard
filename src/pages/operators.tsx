import Layout from "@/components/layout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { CommonWrapper } from "@/styles/common.styles";

const OperatorsPage: NextPageWithLayout = () => {
  return (
    <CommonWrapper>
      <h1>Operators</h1>
    </CommonWrapper>
  );
};

OperatorsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | Operators">{page}</Layout>;
};

export default OperatorsPage;
