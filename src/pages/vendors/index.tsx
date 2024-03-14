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

const Vendors = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const pageNavigateToQueryParam = ({ queryParam, vendorName }: any) => {
    if (vendorName) {
      router.push(`/vendors/${queryParam}?vendor=${vendorName}`);
    } else {
      router.push(`/vendors/${queryParam}`);
    }
  };

  const vendors = [
    {
      name: "Mammy Mbuta",
      description: `Savour the essence of West Africa at Mammy Mbuta, where "Taste
      De Kinshasa" invites you to indulge in an authentic culinary
      experience, celebrating the rich and diverse flavours of the
      region.`,
      imageSrc: "/logo.svg",
      id: 1,
    },
    {
      name: "Jajamelo Hotel",
      description: `Savour the essence of West Africa at Mammy Mbuta, where "Taste
      De Kinshasa" invites you to indulge in an authentic culinary
      experience, celebrating the rich and diverse flavours of the
      region.`,
      imageSrc: "/logo.svg",
      id: 2,
    },
    {
      name: "Jajamelo Hotel",
      description: `Savour the essence of West Africa at Mammy Mbuta, where "Taste
        De Kinshasa" invites you to indulge in an authentic culinary
        experience, celebrating the rich and diverse flavours of the
        region.`,
      imageSrc: "/logo.svg",
      id: 2,
    },
    {
      name: "Jajamelo Hotel",
      description: `Savour the essence of West Africa at Mammy Mbuta, where "Taste
        De Kinshasa" invites you to indulge in an authentic culinary
        experience, celebrating the rich and diverse flavours of the
        region.`,
      imageSrc: "/logo.svg",
      id: 2,
    },
    {
      name: "Jajamelo Hotel",
      description: `Savour the essence of West Africa at Mammy Mbuta, where "Taste
        De Kinshasa" invites you to indulge in an authentic culinary
        experience, celebrating the rich and diverse flavours of the
        region.`,
      imageSrc: "/logo.svg",
      id: 2,
    },
    // Add more vendor objects as needed
  ];

  const handleClickView = (vendorName: string) => {
    pageNavigateToQueryParam({ queryParam: "more-details", vendorName });
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
              pageNavigateToQueryParam({ queryParam: "more-details" })
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
        {vendors.map((vendor, index) => (
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
                <h1>{vendor.name}</h1>
                <p>{vendor.description}</p>
              </Box>
              <Box>
                <Image
                  src={vendor.imageSrc}
                  alt={vendor.name}
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
                <DeleteViewButton>Delete</DeleteViewButton>
              </Box>
              <Box className="buttons">
                <DeleteViewButton
                  toColor={"#095F51"}
                  onClick={() => handleClickView(vendor.name)}
                >
                  {" "}
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
