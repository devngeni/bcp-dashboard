import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { useProductDataContext } from "@/utils/context/products-data";

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

const EditProductPage = ({
  selectItem,
  setSelectItem,
  menuItemPlaceholder,
  selectDataItems,
}: HandleSelectCategoryProps) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileType>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getProductDetails = async () => {
      const { product_id } = router.query;
      try {
        const response = await axios.get(`/api/service/${product_id}`);
        const fetchedProduct = response.data.service;
        setProduct(fetchedProduct);
        setProductName(fetchedProduct.content[0]?.name || "");
        setPrice(fetchedProduct.content[0]?.price || 0);
        setCategory(fetchedProduct.category || "");
        setSubtitle(fetchedProduct.subTitle || "");
        setDescription(fetchedProduct.content[0]?.description || "");
        setSelectedRadio(fetchedProduct.tag || "");
        setSelectedFile(fetchedProduct.content[0]?.imagePath || "");
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    getProductDetails();
  }, [router.query]);

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

  const context = useProductDataContext();
  const editProductFunc = context?.editFunc;
  if (!editProductFunc) {
    console.error("newProductFunc is not defined");
    return null;
  }

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await editProductFunc(
        selectedFile,
        selectItem,
        subtitle,
        selectedRadio,
        productName,
        description,
        price
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    // <Box sx={{ display: "flex" }}>
    <form onSubmit={handleEdit}>
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
          <h1>Edit Product</h1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <YelloWButton type="submit">Save Changes</YelloWButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image src={ArrowIcon} alt="arrow" className="sort_arrow" />
            </Box>
          </Box>
        </TopLevel>
        <Box sx={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
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

            <UploadProductPicture
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
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

          {product &&
            product.content &&
            product.content[0] &&
            product.content[0].imagePath && (
              <Box
                sx={{
                  width: "200px",
                  background: "#fff",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                  height: "200px",
                  mt: "50px",

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
                <Image
                  src={product.content[0].imagePath}
                  alt=""
                  width={1}
                  height={1}
                />
              </Box>
            )}
        </Box>
      </Box>
    </form>
    // <Box></Box>
    // </Box>
  );
};

export default EditProductPage;
