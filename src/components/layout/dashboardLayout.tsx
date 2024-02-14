import { MainComponent, PageContainer } from "@/styles/common.styles";
import React, { useEffect } from "react";
import HeadMetaData from "../HeadMetadata";
import SidebarComponent from "../common-components/navbar/sidebar";
import TopbarComponent from "../common-components/navbar/topbar";
import { ProductDataProvider } from "@/utils/context/products-data";
import { layoutProps } from "./layoutProps";
import { useAuth } from "@/utils/context/auth-provider";
import { useRouter } from "next/router";

const DashBoardLayout = ({
  children,
  pageTitle,
  showSearchComponent,
}: layoutProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    if (!isAuthenticated) {
      router.push("/");
    }
  }

  return (
    <ProductDataProvider>
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

export default DashBoardLayout;
