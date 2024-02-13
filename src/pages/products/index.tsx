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
import DeleteModal from "../../components/products-page/deleteModal";
import toast from "react-hot-toast";

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

interface IProductRows {
  row: Product;
  index: number;
  pageNavigateToQueryParam: ({
    queryParam,
    product_id,
  }: pageNavigateToQueryProps) => void;
  isSelected: boolean;
  onCheckboxClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteFunc: (product_id: string) => void;
  selectedRows: any;
  eachSelectedRow: any;
  setSelectedRows?: any;
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
        alt="next-previous"
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
  selectedRows,
  eachSelectedRow,
  deleteFunc,
  setSelectedRows,
}: IProductRows) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDeleteModal = () => {
    if (selectedRows.length === 0) {
      toast.error("Select the item to delete");
    } else {
      if (eachSelectedRow._id === row._id) {
        setIsDeleteModalOpen((prev) => !prev);
      } else {
        toast.error("Select specific item for delete");
      }
    }
  };

  // Function to handle delete product
  const handleDelete = async (product_id: string) => {
    try {
      setIsLoading(true);
      const res = (await deleteFunc(product_id)) as any;
      if (res.status === 200) {
        setIsDeleteModalOpen(false);
        setSelectedRows([]);
        setIsLoading(false);
      } else {
        toast.error("Error deleting product. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Error deleting product. Please try again.");
    }
  };

  return (
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
              onClick={() => {
                toggleDeleteModal();
              }}
            />
            <DeleteModal
              isLoading={isLoading}
              isDeleteModalOpen={isDeleteModalOpen}
              handleClose={toggleDeleteModal}
              handleDelete={() => handleDelete(row._id)}
            />
          </div>
        </Box>
      </StyledTableCell>
    </TableRow>
  );
};

const ProductsPages: NextPageWithLayout = () => {
  const { services } = useProductDataContext();

  //get data from context replace with your services state in this file

  const router = useRouter();
  const currentPageParam = router.query.page as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [eachSelectedRow, setEachSelectedRow] = useState<any>();

  const context = useProductDataContext();
  const deleteFunc = context?.deleteFunc;

  const toggleOpen = () => setOpen((prev) => !prev);

  // Function to handle individual checkbox click
  const handleCheckboxClick = (index: number) => {
    const isSelected = selectedRows.includes(index);

    let newSelected: number[] = [];

    if (isSelected) {
      newSelected = selectedRows.filter((item) => item !== index);
    } else {
      newSelected = [...selectedRows, index];
      setEachSelectedRow(visibleItems[index]);
    }

    setSelectedRows(newSelected);
  };

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

  const handlePageChange = (newPage: number) => {
    router.push(`/products?page=${newPage}`);
    setCurrentPage(newPage);
  };

  // Function to get page numbers
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

  // Update currentPage when currentPageParam changes
  useEffect(() => {
    if (currentPageParam) {
      const parsedPage = parseInt(currentPageParam, 10);
      // Redirect to the last valid page if parsedPage is out of range
      if (!isNaN(parsedPage) && parsedPage >= 1) {
        const adjustedPage = Math.min(parsedPage, totalPages); // Ensure page is within valid range
        setCurrentPage(adjustedPage); // Update state with adjusted page
      } else {
        router.push(`/products?page=${totalPages}`); // Redirect to last valid page
      }
    }
  }, [currentPageParam, router, totalPages]);

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

  if (!deleteFunc) {
    console.error("deleteFunc is not defined");
    return null;
  }

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
                      selectedRows={selectedRows}
                      eachSelectedRow={eachSelectedRow}
                      setSelectedRows={setSelectedRows}
                      deleteFunc={deleteFunc}
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
