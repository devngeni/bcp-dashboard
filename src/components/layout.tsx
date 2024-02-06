import { MainComponent, PageContainer } from "@/styles/common.styles";
import React, { useEffect, useState } from "react";
import HeadMetaData from "./HeadMetadata";
import SidebarComponent from "./common-components/navbar/sidebar";
import TopbarComponent from "./common-components/navbar/topbar";
import { ProductDataProvider } from "@/utils/context/products-data";

interface layoutProps {
  children: any;
  pageTitle?: string;
  showSearchComponent?: boolean;
}

const Layout = ({ children, pageTitle, showSearchComponent }: layoutProps) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/service");
      const data = await response.json();
      const { services } = data;
      setServices(services);
    })();
  }, []);

  return (
    <ProductDataProvider value={services}>
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
    </ProductDataProvider>
  );
};

export default Layout;
