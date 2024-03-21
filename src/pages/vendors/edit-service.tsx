import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, LinearProgress } from "@mui/material";
import Image from "next/image";
import {
  CommonWrapper,
  StyledInputField,
  StyledRoundButton,
  StyledTextArea,
  YelloWButton,
} from "@/styles/common.styles";
import { TopLevel, UploadProductPicture } from "@/styles/products.styles";
import ArrowIcon from "../../../public/arrowDownIcon.svg";
import UploadImageIcon from "../../../public/uploadImageicon.svg";

import { useRouter } from "next/router";
import { useProductDataContext } from "@/utils/context/products-data";
import toast from "react-hot-toast";
import Loader from "@/components/common-components/loader";
import {
  HandleSelectCategory,
  HandleSelectCategoryProps,
} from "@/components/products-page/handleSelectCategory";
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

const EditVendorService = () => {
  const router = useRouter();
  const { product_id, vendor_id } = router.query;

  const [product, setProduct] = useState<any>({});
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileType>(null);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectItem, setSelectItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { editServiceOfSpecificVendor } = useVendorsDataContext();

  const handleRadioButtonChange = (event: any) => {
    setSelectedRadio(event.target.value);
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          `/api/provider/single/${vendor_id}/${product_id}`
        );
        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
        setProductName(fetchedProduct.content[0]?.name || "");
        setPrice(fetchedProduct.content[0]?.price || 0);
        setSelectItem(fetchedProduct.category || "");
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

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await editServiceOfSpecificVendor(
        selectedFile,
        selectItem,
        subtitle,
        selectedRadio,
        productName,
        description,
        price,
        product.content[0].imagePath
      );
      if (res.success) {
        setIsLoading(false);

        setTimeout(() => {
          //vendors/more-details?vendor_id=65f9a03b40e115ed3fa52d5e&tab=services
          router.push(
            `/vendors/more-details?vendor_id=${vendor_id}&tabName=Services`
          );
        }, 2000);
      }
    } catch (error) {
      console.error("Error editing product", error);
      setIsLoading(false);
    }
  };

  return (
    <CommonWrapper>
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
            <h1>Edit Service</h1>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <YelloWButton type="submit">
                {isLoading ? <Loader /> : "Save Changes"}
              </YelloWButton>
              {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image src={ArrowIcon} alt="arrow" className="sort_arrow" />
              </Box> */}
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
                    type="number"
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
                    menuItemPlaceholder={"select category"}
                    selectItem={selectItem}
                    setSelectItem={setSelectItem}
                    selectDataItems={["PRIVATE CHEF & MEAL PREP"]}
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
                  maxWidth: "743px",
                  label: {
                    fontWeight: 400,
                  },
                }}
              >
                {["Deal of the Month"].map((label, index) => (
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
                  <img
                    src={
                      previewImage ? previewImage : product.content[0].imagePath
                    }
                    alt={"productName"}
                  />
                </Box>
              )}
          </Box>
        </Box>
      </form>
    </CommonWrapper>
  );
};

EditVendorService.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | Vendors (edit-service)">
      {page}
    </DashBoardLayout>
  );
};

export default EditVendorService;
