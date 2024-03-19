import DashBoardLayout from "@/components/layout/dashboardLayout";
import Details from "@/components/vendors-pages/details";
import VendorServices from "@/components/vendors-pages/services";
import { CommonWrapper, YelloWButton } from "@/styles/common.styles";
import { TabButton, TabsBar } from "@/styles/myAccount.styles";
import { ProductsContainer } from "@/styles/products.styles";
import { Box } from "@mui/material";
import Image from "next/image";
import SearchIcon from "../../../public/searchIco.svg";
import React, { ReactElement, useState } from "react";
import NewService from "@/components/vendors-pages/new-service";
import { useVendorsDataContext } from "@/utils/context/vendors-provider";
import { useRouter } from "next/router";
import { VendorProps } from ".";
import { set } from "lodash";

const Vendor = () => {
  const router = useRouter();
  const { vendor_id } = router.query;
  const tabs = ["Details", "Services", "New Service"];
  const [activeTab, setActiveTab] = useState("Details");
  const [title, setTitle] = useState("Vendor");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectItem, setSelectItem] = useState("");
  const [vendorServices, setVendorServices] = useState([]);
  const [vendor, setVendor] = useState({} as VendorProps);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "Details") {
      setTitle("Vendor");
    } else if (tabName === "Services") {
      setTitle("Vendor Services");
    } else if (tabName === "New Service") {
      setTitle("New Service");
    }
  };

  const { getVendorServicesFunc } = useVendorsDataContext();

  const fetchVendorServices = async () => {
    const vendorServicesData = await getVendorServicesFunc?.(vendor_id);
    setVendorServices(vendorServicesData.data);
    setVendor(vendorServicesData.serviceProvider);
    console.log(vendorServicesData.serviceProvider, "vendorServicesData");
  };

  useState(() => {
    fetchVendorServices();
  });

  return (
    <CommonWrapper>
      <ProductsContainer>
        <Box sx={{ width: "100%", height: "100%" }}>
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
            {activeTab === "Services" && (
              <Box className="searchProduct_box">
                <Box
                  sx={{ display: "flex", alignItems: "center", height: "100%" }}
                >
                  <Image src={SearchIcon} alt="search" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Box>
              </Box>
            )}
          </TabsBar>
          {activeTab === "Details" && <Details vendor={vendor} />}
          {activeTab === "Services" && (
            <VendorServices
              searchQuery={searchQuery}
              rowData={vendorServices}
              vendorDetails={vendor}
            />
          )}
          {activeTab === "New Service" && (
            <NewService
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              selectDataItems={["PRIVATE CHEF & MEAL PREP"]}
              menuItemPlaceholder="select category"
            />
          )}
        </Box>
      </ProductsContainer>
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
