import React, { useState } from "react";
import axios from "axios";
import { Box, LinearProgress } from "@mui/material";
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
import {
  HandleSelectCategory,
  HandleSelectCategoryProps,
} from "./handleSelectCategory";

interface ServiceObject {
  category: string;
  subTitle: string;
  tag: string;
  content: {
    name: string;
    description: string;
    imagePath: string;
    price: number;
  }[];
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

const NewProductPage = ({
  selectItem,
  setSelectItem,
  menuItemPlaceholder,
  selectDataItems,
}: HandleSelectCategoryProps) => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileType>(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const Service: ServiceObject = {
        category: selectItem,
        subTitle: subtitle,
        tag: selectedRadio,
        content: [
          {
            name: productName,
            description: description,
            imagePath: "", // We need to upload this separately
            price: price,
          },
        ],
      };

      const response = await axios.post(
        "http://localhost:3000/api/service",
        Service
      );

      setProductName("");
      setPrice(0);
      setCategory("Select Category");
      setSubtitle("");
      setDescription("");
      setSelectedRadio("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleRadioButtonChange = (event: any) => {
    setSelectedRadio(event.target.value);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
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
    setSelectedFile(file);
    simulateUpload(setProgress);
  };

  return (
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
          <h1>New Product</h1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <YelloWButton type="submit">Save Product</YelloWButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image src={ArrowIcon} alt="arrow" className="sort_arrow" />
            </Box>
          </Box>
        </TopLevel>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <StyledInputField sx={{ width: "556px" }}>
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </StyledInputField>

            <StyledInputField sx={{ width: "167px" }}>
              <label>Price</label>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </StyledInputField>
          </Box>

          <Box
            sx={{ display: "flex", gap: "20px", mt: "20px", flexWrap: "wrap" }}
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
              <input
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
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
      </Box>
    </form>
  );
};

export default NewProductPage;