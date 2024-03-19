import React, { ReactElement, useState } from "react";
import Loader from "@/components/common-components/loader";
import {
  CommonWrapper,
  StyledInputField,
  StyledTextArea,
  YelloWButton,
} from "@/styles/common.styles";
import { TopLevel, UploadProductPicture } from "@/styles/products.styles";
import { Box, LinearProgress } from "@mui/material";
import Image from "next/image";
import UploadImageIcon from "../../../public/uploadImageicon.svg";
import DashBoardLayout from "@/components/layout/dashboardLayout";
import { useVendorsDataContext } from "@/utils/context/vendors-provider";

type FileType = File | null;

const simulateUpload = (setProgress: any) => {
  let simulatedProgress = 0;
  const intervalId = setInterval(() => {
    simulatedProgress += 20;
    setProgress(simulatedProgress);
    if (simulatedProgress >= 100) {
      clearInterval(intervalId);
    }
  }, 100);
};

const NewVendor = () => {
  const [vendorName, setVendorName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<FileType>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { addVendorFunc } = useVendorsDataContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await addVendorFunc({ vendorName, selectedFile, description });
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    simulateUpload(setProgress);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    simulateUpload(setProgress);
  };

  return (
    <CommonWrapper>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            label: {
              fontFamily: "Montserrat",
              fontWeight: "500",
              fontSize: "14px",
              color: "#374151",
            },
          }}
        >
          <TopLevel>
            <h1>New Vendor</h1>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <YelloWButton type="submit">
                {isLoading ? <Loader /> : "Save"}
              </YelloWButton>
            </Box>
          </TopLevel>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
              <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <StyledInputField sx={{ width: "750px" }}>
                  <label>Vendor Name</label>
                  <input
                    type="text"
                    placeholder="vendor name"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                </StyledInputField>
              </Box>

              <UploadProductPicture
                sx={{ m: "20px 0" }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <label>Vendor banner Image</label>
                <Box className="upload_box">
                  <Image src={UploadImageIcon} alt="arrow" />
                  <Box className="upload_text">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                    <label htmlFor="fileInput">
                      <span>Upload a file</span>{" "}
                    </label>
                    or drag and drop
                  </Box>
                  <Box className="upload_text small_size">
                    PNG, JPG, GIF up to 10MB
                  </Box>

                  {selectedFile && (
                    <Box>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ width: "100px" }}
                      />
                      {progress === 100 && (
                        <Box className="selected-file">{selectedFile.name}</Box>
                      )}
                    </Box>
                  )}
                </Box>
              </UploadProductPicture>

              <Box sx={{ display: "flex", gap: "20px" }}>
                <StyledTextArea sx={{}}>
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </StyledTextArea>
              </Box>
            </Box>

            {previewImage && (
              <Box
                sx={{
                  width: "200px",
                  background: "#fff",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                  height: "200px",
                  mt: "50px",
                  ml: "50px",

                  img: {
                    width: "100%",
                    height: "100%",
                  },

                  "@media (max-width: 1200px)": {
                    mt: "0px",
                    gap: "10px",
                  },
                }}
              >
                <img src={previewImage} alt={"vendorName"} />
              </Box>
            )}
          </Box>
        </Box>
      </form>
    </CommonWrapper>
  );
};

NewVendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | new-vendor">
      {page}
    </DashBoardLayout>
  );
};

export default NewVendor;
