import DashBoardLayout from "@/components/layout/dashboardLayout";
import Details from "@/components/vendors-pages/details";
import { CommonWrapper, YelloWButton } from "@/styles/common.styles";
import { TabButton, TabsBar } from "@/styles/myAccount.styles";
import { Box } from "@mui/material";
import React, { ReactElement, useState } from "react";

const Vendor = () => {
  const tabs = ["Details", "Services", "New Service"];
  const [activeTab, setActiveTab] = useState("Details");
  const [title, setTitle] = useState("Vendor");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "Details") {
      setTitle("Vendor");
    } else if (tabName === "Services") {
      setTitle("Vendor Services");
    } else if (tabName === "New Service") {
      setTitle("Edit Service");
    }
  };

  return (
    <CommonWrapper>
      <h1>{title}</h1>
      <TabsBar>
        <Box className="sub_box">
          {tabs.map((tabName) => (
            <TabButton
              key={tabName}
              className={activeTab === tabName ? "active" : ""}
              onClick={() => handleTabClick(tabName)}
            >
              {tabName}
            </TabButton>
          ))}
        </Box>
        <Box className="sub_box">
          <YelloWButton>Add Service</YelloWButton>
        </Box>
      </TabsBar>
      {activeTab === "Details" && <Details />}
      {activeTab === "Services" && <div>services</div>}
      {activeTab === "New Service" && <div>new service</div>}
    </CommonWrapper>
  );
};

Vendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | Vendor">
      {page}
    </DashBoardLayout>
  );
};
export default Vendor;
