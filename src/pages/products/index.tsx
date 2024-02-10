import React, { ReactElement, useEffect, useState } from "react";

import {
  CommonWrapper,
  StyledTableCell,
  YelloWButton,
} from "@/styles/common.styles";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BottomNav,
  PaginationBtn,
  ProductItemBox,
  ProductsContainer,
  ProductsTable,
  SortBox,
  StyledCheckBox,
  TopLevel,
} from "@/styles/products.styles";
import ArrowIcon from "../../../public/arrowDownIcon.svg";
import ArrowPreviousNextIcon from "../../../public/arrowLeftIcon.svg";
import SearchIcon from "../../../public/searchIco.svg";
import SortIcon from "../../../public/sortIcon.svg";

import Image from "next/image";

//mui icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { useProductDataContext } from "@/utils/context/products-data";
import DashBoardLayout from "@/components/layout/dashboardLayout";

interface Icontent {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  _id: string;
}
interface Product {
  price: number;
  _id: string;
  category: string;
  subTitle: string;
  content: any;
  id: any;
}

interface pageNavigateToQueryProps {
  queryParam: string;
  product_id?: any;
}

function isValidImageUrl(url: any) {
  return (
    url &&
    (url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/"))
  );
}

const PreviousNextIcon = ({ isNextBtn }: { isNextBtn?: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: isNextBtn ? "0 0 0 2px" : "0 2px 0 0",
        transform: isNextBtn ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <Image
        src={ArrowPreviousNextIcon}
        alt="next-priviuos"
        width={20}
        height={20}
      />
    </Box>
  );
};

const ProductRow = ({
  row,
  index,
  pageNavigateToQueryParam,
  isSelected,
  onCheckboxClick,
  handleDelete,
}: {
  row: Product;
  index: number;
  pageNavigateToQueryParam: ({
    queryParam,
    product_id,
  }: pageNavigateToQueryProps) => void;
  isSelected: boolean;
  onCheckboxClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (product_id: string) => Promise<void>;
}) => (
  <TableRow key={index}>
    <StyledTableCell>{index + 1}</StyledTableCell>
    <StyledTableCell className="small_size">
      <StyledCheckBox checked={isSelected} onChange={onCheckboxClick} />
    </StyledTableCell>
    <StyledTableCell>
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
    </StyledTableCell>
    <StyledTableCell sx={{ maxWidth: "150px" }}>
      <Box
        sx={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {row.content[0].description}
      </Box>
    </StyledTableCell>
    <StyledTableCell>{row.category}</StyledTableCell>
    <StyledTableCell>{row.subTitle}</StyledTableCell>
    <StyledTableCell>{row.content[0].price}</StyledTableCell>
    <StyledTableCell sx={{ width: "100px" }}>
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
            pageNavigateToQueryParam({
              queryParam: "edit-product",
              product_id: row._id,
            })
          }
        >
          <EditOutlinedIcon />
        </div>

        <div title="Delete">
          <DeleteOutlineOutlinedIcon
            color="error"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      </Box>
    </StyledTableCell>
  </TableRow>
);

const ProductsPages: NextPageWithLayout = () => {
  const { services } = useProductDataContext();

  //get data from context replace with your services state in this file

  const router = useRouter();
  const currentPageParam = router.query.page as string | undefined;
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  //const [services, setServices] = useState<any>();

  const context = useProductDataContext();
  const deleteFunc = context?.deleteFunc;
  if (!deleteFunc) {
    console.error("deleteFunc is not defined");
    return null;
  }
  const handleDelete = async (product_id: string) => {
    try {
      await deleteFunc(product_id);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  // Function to handle individual checkbox click
  const handleCheckboxClick = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("http://localhost:3000/api/service");
  //     const data = await response.json();
  //     const { services } = data;
  //     setServices(services);
  //   })();
  // }, []);

  // Function to handle "Select All" checkbox click
  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedRows([]);
    } else {
      setSelectAll(true);
      setSelectedRows(visibleItems.map((_: any, index: any) => index));
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(services && services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems =
    services && services.slice(startIndex, startIndex + itemsPerPage);

  console.log(visibleItems);

  const handlePageChange = (newPage: number) => {
    router.push(`/products?page=${newPage}`);
    setCurrentPage(newPage);
  };

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];

    const maxVisiblePages = 6; // Maximum number of visible page numbers

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages - 2) {
        for (let i = 1; i <= maxVisiblePages - 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - (maxVisiblePages - 3)) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - (maxVisiblePages - 3); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Inside your component ProductsPages
  // useEffect(() => {
  //   if (currentPageParam) {
  //     const parsedPage = parseInt(currentPageParam, 10);
  //     if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
  //       setCurrentPage(parsedPage);
  //     } else {
  //       // Handle invalid page number or out of range
  //       router.push("/products?page=1 & page was not found"); // Redirect to page 1 by default
  //     }
  //   }
  // }, [currentPageParam, router, totalPages]);

  const pageNavigateToQueryParam = ({
    queryParam,
    product_id,
  }: pageNavigateToQueryProps) => {
    if (product_id) {
      router.push(`/products/${queryParam}?product_id=${product_id}`);
    } else {
      router.push(`/products/${queryParam}`);
    }
  };

  return (
    <CommonWrapper>
      <ProductsContainer>
        <TopLevel open={open}>
          <h1>Products</h1>
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
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Image src={SearchIcon} alt="search" />
                <input type="text" placeholder="Search" />
              </Box>
              <SortBox>
                <Image src={SortIcon} alt="sortIcon" />
                <Box className="sort_text">Sort</Box>
                <Image src={ArrowIcon} alt="arrow" className="sort_arrow" />
              </SortBox>
            </Box>
            <YelloWButton
              onClick={() =>
                pageNavigateToQueryParam({ queryParam: "new-product" })
              }
            >
              Add new product
            </YelloWButton>
            <Box className="arrow" onClick={toggleOpen}>
              <Image src={ArrowIcon} alt="arrow" />
            </Box>
          </Box>
        </TopLevel>
        <ProductsTable>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="bold small_size">
                    #
                  </StyledTableCell>
                  <StyledTableCell className="bold">
                    <StyledCheckBox
                      checked={selectAll}
                      onChange={handleSelectAllClick}
                    />
                  </StyledTableCell>
                  <StyledTableCell className="bold product_size">
                    PRODUCT
                  </StyledTableCell>
                  <StyledTableCell className="bold">
                    DESCRIPTION
                  </StyledTableCell>
                  <StyledTableCell className="bold">CATEGORY</StyledTableCell>
                  <StyledTableCell className="bold">SUBTITTLE</StyledTableCell>
                  <StyledTableCell className="bold">PRICE($)</StyledTableCell>
                  <StyledTableCell className="bold">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleItems &&
                  visibleItems.map((row: any, index: any) => (
                    <ProductRow
                      key={index}
                      row={row}
                      index={index}
                      isSelected={selectedRows.includes(index)}
                      onCheckboxClick={() => handleCheckboxClick(index)}
                      pageNavigateToQueryParam={pageNavigateToQueryParam}
                      handleDelete={handleDelete}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ProductsTable>
        <BottomNav>
          <Box className="pagination_box">
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              className="pagination_text"
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
            >
              <PreviousNextIcon />
              Previous
            </Box>
            <Box
              sx={{
                position: "absolute",
                maxWidth: "290px",
                top: "-2px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "row",

                "@media screen and (max-width: 610px)": {
                  display: "none",
                },
              }}
            >
              {getPageNumbers().map((pageNumber: any, index: any) => (
                <PaginationBtn
                  key={index}
                  className={pageNumber === currentPage ? "activePage" : ""}
                  onClick={() => {
                    if (pageNumber !== "...") {
                      handlePageChange(pageNumber);
                    }
                  }}
                  sx={{
                    cursor: pageNumber === "..." ? "default" : "pointer",
                    margin: "0 5px",
                  }}
                >
                  {pageNumber}
                </PaginationBtn>
              ))}
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              className="pagination_text"
              onClick={() => {
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
            >
              Next
              <PreviousNextIcon isNextBtn={true} />
            </Box>
          </Box>
        </BottomNav>
      </ProductsContainer>
    </CommonWrapper>
  );
};

ProductsPages.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | Products">
      {page}
    </DashBoardLayout>
  );
};

export default ProductsPages;

// const tableData = [
//   {
//     id: 1,
//     product: "Product A",
//     productImage:
//       "https://img.freepik.com/free-photo/fresh-cola-drink-glass_144627-16201.jpg?w=740&t=st=1706889461~exp=1706890061~hmac=d7037e9e1fe5d9c5aa1e1e96c2275339b1f91697be15b44b2c317fb1b833bf15",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 3.6,
//     cost: 15120,
//   },
//   {
//     id: 2,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 3,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 4,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 5,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 6,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 7,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 8,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 9,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 10,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 11,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 12,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 13,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 14,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 15,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 16,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 17,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 18,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 19,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 20,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 21,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 22,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 23,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 24,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
//   {
//     id: 25,
//     product: "Product B",
//     productImage:
//       "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
//     category: "Drinks",
//     description:
//       "Spend a day in the lush karen neighbourhood learning about her heritage",
//     subtitle: "soft drinks",
//     price: 4.02,
//     cost: 20000,
//   },
// ];
