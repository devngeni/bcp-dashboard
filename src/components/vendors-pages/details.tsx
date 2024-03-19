import { StyledTextArea, YelloWButton } from "@/styles/common.styles";
import { VendorMoreDetails } from "@/styles/vendors.styles";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../common-components/loader";
import { ChangeImageButton } from "@/styles/myAccount.styles";
import { VendorProps } from "@/pages/vendors";

const Details = ({ vendor }: any) => {
  const router = useRouter();
  const { vendor_id } = router.query;

  console.log("vendor_id", vendor);

  const [vendorDetails, setVendorDetails] = useState("" ?? vendor.description);
  const [vendorName, setVendorName] = useState("" ?? vendor.title);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    file: null,
    previewImage: null,
  });
  const fileInputRef: any = useRef(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickChange = () => {
    fileInputRef.current.click(); // Trigger click on file input
  };

  useEffect(() => {
    // Set initial state values after the component mounts and vendor data is available
    setVendorDetails(vendor?.description ?? "");
    setVendorName(vendor?.title ?? "");
  }, [vendor]);

  return (
    <Box>
      <VendorMoreDetails>
        <Box>
          <Box className="vendor_image">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <Image
              src={selectedImage.previewImage ?? vendor?.image}
              alt="vendor-img"
              width={345}
              height={185}
            />
            <ChangeImageButton
              onClick={handleClickChange}
              className="change_image_btn"
            >
              Change image
            </ChangeImageButton>
          </Box>
          <Box>
            <input
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </Box>
          <StyledTextArea
            sx={{
              marginTop: "10px",
              // width:"550px",
              textarea: {
                fontFamily: "Montserrat !important",
                fontSize: "16px !important",
                color: "#6B7280 !important",
                fontWeight: "400 !important",
                marginTop: "10px !important",
                lineHeight: "25px !important",
                background: "transparent !important",
                padding: "25px 5px !important",
              },
            }}
          >
            <textarea
              value={vendorDetails}
              onChange={(e) => setVendorDetails(e.target.value)}
            />
          </StyledTextArea>
          <YelloWButton className="update_btn">
            {isLoading ? <Loader /> : "Update"}
          </YelloWButton>
        </Box>
      </VendorMoreDetails>
    </Box>
  );
};

export default Details;
