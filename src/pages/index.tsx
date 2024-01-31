import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout";

const Home: NextPageWithLayout = () => {
  return <div>Home</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | Dashboard">{page}</Layout>;
};

export default Home;
