import Layout from "@/components/layout";
import EditProductPage from "@/components/products-page/editProductPage";
import NewProductPage from "@/components/products-page/newProductPage";
import { CommonWrapper } from "@/styles/common.styles";
import { ProductsContainer } from "@/styles/products.styles";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

const ProductPage = () => {
  const router = useRouter();
  const { productPage } = router.query;
  const [selectItem, setSelectItem] = useState("");

  const commonProps = {
    selectItem,
    setSelectItem,
    selectDataItems: [
      "TOURS AND EXPERIENCES",
      "TRAVEL CONCIERGE",
      "HOUSEKEEPING",
      "PROPERTY MANAGEMENT",
      "DRINKS",
      "PRIVATE CHEF & MEAL PREP",
      "WELLNESS AND GROOMING",
      "SHOPPING & GROCERY RUNS",
      "NANNY SERVICE",
      "GIFTSHOP",
      "RENTABLES",
      "LAUGGAGE SHOP",
    ],
    menuItemPlaceholder: "Select Category",
  };

  const getContent = () => {
    switch (productPage) {
      case "new-product":
        return <NewProductPage {...commonProps} />;
      case "edit-product":
        return <EditProductPage {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <CommonWrapper>
      <ProductsContainer>{getContent()}</ProductsContainer>
    </CommonWrapper>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | Products">{page}</Layout>;
};

export default ProductPage;
