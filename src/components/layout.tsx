import { MainComponent, PageContainer } from "@/styles/common.styles";
import React from "react";
import HeadMetaData from "./HeadMetadata";
import SidebarComponent from "./common-components/navbar/sidebar";
import TopbarComponent from "./common-components/navbar/topbar";

interface layoutProps {
  children: any;
  pageTitle?: string;
  showSearchComponent?: boolean;
}

const Layout = ({ children, pageTitle, showSearchComponent }: layoutProps) => {
  return (
    <PageContainer>
      <HeadMetaData pageTitle={pageTitle} />
      <SidebarComponent />
      <MainComponent>
        <TopbarComponent showSearchComponent={showSearchComponent} />
        <main
          style={{
            position: "relative",
            height: "calc(100% - 64px)",
            overflowY: "auto",
            overflowX: "hidden",
            marginBottom: "20px",
          }}
        >
          {children}
        </main>
      </MainComponent>
    </PageContainer>
  );
};

export default Layout;
