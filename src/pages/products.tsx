import Layout from "@/components/layout";
import React, { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";
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
  ProductItemBox,
  ProductsContainer,
  ProductsTable,
  SortBox,
  StyledCheckBox,
  TopLevel,
} from "@/styles/products.styles";
import ArrowIcon from "../../public/arrowDownIcon.svg";
import SearchIcon from "../../public/searchIco.svg";
import SortIcon from "../../public/sortIcon.svg";

import Image from "next/image";

//mui icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface Product {
  product: string;
  productImage: string;
  category: string;
  description: string;
  subtitle: string;
  price: number;
  cost: number;
}

const ProductRow = ({ row, index }: { row: Product; index: number }) => (
  <TableRow key={index}>
    <StyledTableCell>{index + 1}</StyledTableCell>
    <StyledTableCell className="small_size">
      <StyledCheckBox />
    </StyledTableCell>
    <StyledTableCell>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ProductItemBox>
          <Box className="image_box">
            <Image
              src={row.productImage}
              alt="prod-image"
              width={48}
              height={48}
            />
          </Box>
          <Box className="product_name">
            <h1>{row.product}</h1>
            <p>65707ab58920c36a3b5557c9</p>
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
        {row.description}
      </Box>
    </StyledTableCell>
    <StyledTableCell>{row.category}</StyledTableCell>
    <StyledTableCell>{row.subtitle}</StyledTableCell>
    <StyledTableCell>{row.price}</StyledTableCell>
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
        <div title="Edit">
          <EditOutlinedIcon />
        </div>

        <div title="Delete">
          <DeleteOutlineOutlinedIcon color="error" />
        </div>
      </Box>
    </StyledTableCell>
  </TableRow>
);

const Products: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <CommonWrapper>
      <ProductsContainer>
        <TopLevel open={open}>
          <h1>Products</h1>
          <Box
            sx={{
              display: "flex",
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
            <YelloWButton>Add new product</YelloWButton>
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
                    <StyledCheckBox />
                  </StyledTableCell>
                  <StyledTableCell className="bold product_size">
                    PRODUCT
                  </StyledTableCell>
                  <StyledTableCell className="bold">
                    DESCRIPTION
                  </StyledTableCell>
                  <StyledTableCell>CATEGORY</StyledTableCell>
                  <StyledTableCell className="bold">SUBTITTLE</StyledTableCell>
                  <StyledTableCell className="bold">PRICE($)</StyledTableCell>
                  <StyledTableCell className="bold">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row: any, index: any) => (
                  <ProductRow key={index} row={row} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ProductsTable>
        <BottomNav></BottomNav>
      </ProductsContainer>
    </CommonWrapper>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | Products">{page}</Layout>;
};

export default Products;

const tableData = [
  {
    product: "Product A",
    productImage:
      "https://img.freepik.com/free-photo/fresh-cola-drink-glass_144627-16201.jpg?w=740&t=st=1706889461~exp=1706890061~hmac=d7037e9e1fe5d9c5aa1e1e96c2275339b1f91697be15b44b2c317fb1b833bf15",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 3.6,
    cost: 15120,
  },
  {
    product: "Product B",
    productImage:
      "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 4.02,
    cost: 20000,
  },
  {
    product: "Product B",
    productImage:
      "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 4.02,
    cost: 20000,
  },
  {
    product: "Product B",
    productImage:
      "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 4.02,
    cost: 20000,
  },
  {
    product: "Product B",
    productImage:
      "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 4.02,
    cost: 20000,
  },
  {
    product: "Product B",
    productImage:
      "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 4.02,
    cost: 20000,
  },
  {
    product: "Product B",
    productImage:
      "https://img.freepik.com/premium-psd/glass-drink-bottle-mockup-3d-rendering_13598-253.jpg?size=626&ext=jpg&ga=GA1.1.1107306055.1706171759&semt=sph",
    category: "Drinks",
    description:
      "Spend a day in the lush karen neighbourhood learning about her heritage",
    subtitle: "soft drinks",
    price: 4.02,
    cost: 20000,
  },
];
