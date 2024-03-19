import DashBoardLayout from "@/components/layout/dashboardLayout";
import { CommonWrapper, YelloWButton } from "@/styles/common.styles";
import SearchIcon from "../../../public/searchIco.svg";

import { Box } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { TopLevel } from "@/styles/products.styles";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ButtonsBox,
  DeleteViewButton,
  VendorsSubWrapper,
} from "@/styles/vendors.styles";
import { useVendorsDataContext } from "@/utils/context/vendors-provider";
import DeleteModal from "@/components/products-page/deleteModal";

export interface VendorProps {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export interface VendorServicesProps extends VendorProps {
  _id: string;
  content: {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    price: string;
  }[];
  category: string;
  subTitle: string;
  price: number;
  description: string;
}

const Vendors = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { vendorsData, deleteVendorFunc } = useVendorsDataContext();
  console.log("vendorsData", vendorsData);

  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const pageNavigateToQueryParam = ({ queryParam, vendor_id }: any) => {
    if (vendor_id) {
      router.push(`/vendors/${queryParam}?vendor_id=${vendor_id}`);
    } else {
      router.push(`/vendors/${queryParam}`);
    }
  };

  //handle delete function by _id
  const handleDelete = async (vendor_id: string) => {
    try {
      setIsLoading(true);
      const data = await deleteVendorFunc(vendor_id);

      if (data) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };

  const filterDataBySearch = () => {
    if (searchQuery.trim() !== "") {
      return vendorsData.filter(
        (vendor) =>
          vendor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return vendorsData;
  };

  return (
    <CommonWrapper>
      <TopLevel>
        <h1>Vendors</h1>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box className="searchProduct_box">
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <Image src={SearchIcon} alt="search" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>
          </Box>
          <YelloWButton
            onClick={() =>
              pageNavigateToQueryParam({ queryParam: "new-vendor" })
            }
          >
            Add Vendor
          </YelloWButton>
        </Box>
      </TopLevel>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          mt: "30px",
          gap: "20px",
        }}
      >
        {filterDataBySearch()?.map((vendor, index) => (
          <VendorsSubWrapper key={index}>
            <Box
              sx={{
                display: "flex",
                height: "119px",
                padding: "20px",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <h1>{vendor.title}</h1>
                <p>{vendor.description}</p>
              </Box>
              <Box>
                <Image
                  src={vendor?.image ?? "/vendor.png"}
                  alt={vendor?.title}
                  width={81}
                  height={84}
                />
              </Box>
            </Box>
            <ButtonsBox>
              <Box
                sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.1)" }}
                className="buttons"
              >
                <DeleteViewButton onClick={toggleDeleteModal}>
                  Delete
                </DeleteViewButton>
                {isDeleteModalOpen && (
                  <DeleteModal
                    isLoading={isLoading}
                    isDeleteModalOpen={isDeleteModalOpen}
                    handleClose={toggleDeleteModal}
                    handleDelete={() => handleDelete(vendor._id)}
                    message="Are you sure you want to delete this vendor?"
                    styles={{
                      background: "rgba(0,0,0,0.05)",
                      boxShadow: "none",
                    }}
                  />
                )}
              </Box>
              <Box className="buttons">
                <DeleteViewButton
                  toColor={"#095F51"}
                  onClick={() =>
                    pageNavigateToQueryParam({
                      queryParam: "more-details",
                      vendor_id: vendor._id,
                    })
                  }
                >
                  View
                </DeleteViewButton>
              </Box>
            </ButtonsBox>
          </VendorsSubWrapper>
        ))}
      </Box>
    </CommonWrapper>
  );
};

Vendors.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | Vendors">
      {page}
    </DashBoardLayout>
  );
};
export default Vendors;
