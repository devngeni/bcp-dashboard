import React, { useState } from "react";
import { isValidImageUrl } from "@/pages/products";
import { CommonWrapper, StyledTableCell } from "@/styles/common.styles";
import {
  ProductItemBox,
  ProductsTable,
  StyledCheckBox,
} from "@/styles/products.styles";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteModal from "../products-page/deleteModal";
import { VendorServicesProps } from "@/pages/vendors";

const VendorServices = ({ searchQuery, vendorDetails, rowData }: any) => {
  const router = useRouter();
  // const { vendor } = router.query;
  // console.log(rowData, "rowData");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (product_id: string) => {};

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const filterDataBySearchQuery = () => {
    if (searchQuery.trim() !== "") {
      //by name, category, subtitle
      return rowData.filter(
        (row: VendorServicesProps) =>
          row.content[0].name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.subTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return rowData;
  };

  return (
    <CommonWrapper sx={{ p: "20px 0 0 0" }}>
      <h2>{vendorDetails.title}</h2>
      <ProductsTable sx={{ paddingBottom: "0", pt: "10px" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="bold small_size">#</StyledTableCell>
                <StyledTableCell className="bold">
                  {/* <StyledCheckBox
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                  /> */}
                </StyledTableCell>
                <StyledTableCell className="bold product_size">
                  PRODUCT
                </StyledTableCell>
                <StyledTableCell className="bold">DESCRIPTION</StyledTableCell>
                <StyledTableCell className="bold">CATEGORY</StyledTableCell>
                <StyledTableCell className="bold">SUBTITTLE</StyledTableCell>
                <StyledTableCell className="bold">PRICE($)</StyledTableCell>
                <StyledTableCell className="bold">ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterDataBySearchQuery().map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <StyledCheckBox />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <ProductItemBox>
                        <Box className="image_box">
                          <Image
                            src={
                              isValidImageUrl(row.content[0].imagePath)
                                ? row.content[0].imagePath
                                : ""
                            }
                            alt={
                              isValidImageUrl(row.content[0].imagePath)
                                ? "prod-image"
                                : "Image not available"
                            }
                            width={48}
                            height={48}
                          />
                        </Box>
                        <Box className="product_name">
                          <h1>{row.content[0].name}</h1>
                          <p>{row._id}</p>
                        </Box>
                      </ProductItemBox>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "150px" }}>
                    <Box
                      sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {row.description}
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.subTitle}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "30px",
                        gap: "10px",
                        svg: {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <div
                        title="Edit"
                        onClick={() =>
                          router.push(
                            `/vendors/edit-service?product_id=${row._id}`
                          )
                        }
                      >
                        <EditOutlinedIcon />
                      </div>

                      <div title="Delete">
                        <DeleteOutlineOutlinedIcon
                          color="error"
                          onClick={() => {
                            toggleDeleteModal();
                          }}
                        />
                      </div>
                      {isDeleteModalOpen && (
                        <DeleteModal
                          isLoading={isLoading}
                          isDeleteModalOpen={isDeleteModalOpen}
                          handleClose={toggleDeleteModal}
                          handleDelete={() => handleDelete(row.id)}
                          styles={{
                            background: "rgba(0,0,0,0.01)",
                            boxShadow: "none !important",
                            border: "none",
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ProductsTable>
    </CommonWrapper>
  );
};

export default VendorServices;
