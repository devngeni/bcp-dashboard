import Layout from "@/components/layout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { CommonPageContainer } from "@/styles/common.styles";

const Products: NextPageWithLayout = () => {
  return (
    <CommonPageContainer>
      <h1>Products</h1>
    </CommonPageContainer>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | Products">{page}</Layout>;
};

export default Products;
