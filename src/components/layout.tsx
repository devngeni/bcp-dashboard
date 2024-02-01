import { MainComponent, PageContainer } from "@/styles/common.styles";
import React from "react";
import HeadMetaData from "./HeadMetadata";
import SidebarComponent from "./common-components/navbar/sidebar";
import TopbarComponent from "./common-components/navbar/topbar";

interface layoutProps {
  children: any;
  pageTitle?: string;
}

const Layout = ({ children, pageTitle }: layoutProps) => {
  return (
    <PageContainer>
      <HeadMetaData pageTitle={pageTitle} />
      <SidebarComponent />
      <MainComponent>
        <TopbarComponent />
        <main style={{ height: "calc(100% - 64px)" }}>{children}</main>
      </MainComponent>
    </PageContainer>
  );
};

export default Layout;
