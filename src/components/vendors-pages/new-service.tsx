import "dotenv/config";
import React, { useState } from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import Image from "next/image";
import {
  StyledInputField,
  StyledRoundButton,
  StyledTextArea,
  YelloWButton,
} from "@/styles/common.styles";
import { TopLevel, UploadProductPicture } from "@/styles/products.styles";
import ArrowIcon from "../../../public/arrowDownIcon.svg";
import UploadImageIcon from "../../../public/uploadImageicon.svg";

import { useProductDataContext } from "@/utils/context/products-data";
import Loader from "../common-components/loader";
import {
  HandleSelectCategory,
  HandleSelectCategoryProps,
} from "../products-page/handleSelectCategory";
import { useRouter } from "next/router";
import { useVendorsDataContext } from "@/utils/context/vendors-provider";

interface INewServiceProps extends HandleSelectCategoryProps {
  vendorName: string;
}

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

const NewService = ({
  selectItem,
  setSelectItem,
  menuItemPlaceholder,
  selectDataItems,
  vendorName,
}: INewServiceProps) => {
  const router = useRouter();
  const { vendor_id } = router.query;
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState("");
  const [subtitle, setSubtitle] = useState<string>("Restaurant");
  const [description, setDescription] = useState<string>("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileType>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { addNewServicetoVendorFunc } = useVendorsDataContext();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await addNewServicetoVendorFunc(
        vendor_id,
        selectedFile,
        selectItem,
        subtitle,
        selectedRadio,
        productName,
        description,
        price
      );
      if (res.data.success) {
        setIsLoading(false);
        setProductName("");
        setPrice("");
        // setSubtitle("");
        setDescription("");
        setSelectedRadio("");
        setSelectedFile(null);
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };

  const handleRadioButtonChange = (event: any) => {
    setSelectedRadio(event.target.value);
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
      <TopLevel sx={{ position: "relative", mt: "20px" }}>
        <h2>{vendorName}</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            position: "absolute",
            bottom: "calc(100% + 26px)",
            right: "0",
          }}
        >
          <YelloWButton onClick={() => handleSubmit()}>
            {isLoading ? <Loader /> : "Save Product"}
          </YelloWButton>
        </Box>
      </TopLevel>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <StyledInputField sx={{ width: "556px" }}>
              <label>service</label>
              <input
                type="text"
                placeholder="Product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </StyledInputField>

            <StyledInputField sx={{ width: "167px" }}>
              <label>Price($)</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </StyledInputField>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              mt: "20px",
              flexWrap: "wrap",
            }}
          >
            <StyledInputField
              sx={{
                width: "361.5px",
              }}
            >
              <label>Category</label>
              <HandleSelectCategory
                menuItemPlaceholder={menuItemPlaceholder}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                selectDataItems={selectDataItems}
              />
            </StyledInputField>

            <StyledInputField
              sx={{
                width: "361.5px",
              }}
            >
              <label>Subtitle</label>
              <input type="text" placeholder="Subtitle" value={subtitle} />
            </StyledInputField>
          </Box>

          <Box sx={{ display: "flex", gap: "20px", mt: "28px" }}>
            <StyledTextArea sx={{}}>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </StyledTextArea>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              mt: "28px",
              maxWidth: "743px",
              label: {
                fontWeight: 400,
              },
            }}
          >
            {[
              "Featured",
              "Deal of the Month",
              "Add to quick actions",
              "On Offer/Discount",
            ].map((label, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  width: "fit-content",
                  alignItems: "center",
                }}
              >
                <StyledRoundButton
                  checked={selectedRadio === label}
                  value={label}
                  onChange={handleRadioButtonChange}
                />
                <label>{label}</label>
              </Box>
            ))}
            {selectedRadio.trim() !== "" && (
              <Button
                sx={{
                  color: "#fff",
                  background: "#FF0000",
                  textTransform: "none",

                  "&:hover": {
                    background: "#FF0000",
                    color: "#fff",
                  },
                }}
                onClick={() => {
                  setSelectedRadio("");
                }}
              >
                Remove tag
              </Button>
            )}
          </Box>

          <UploadProductPicture onDragOver={handleDragOver} onDrop={handleDrop}>
            <label>Product pictures</label>
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
            <img src={previewImage} alt={"productName"} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewService;
