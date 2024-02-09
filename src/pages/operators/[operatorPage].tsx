import DashBoardLayout from "@/components/layout/dashboardLayout";
import AddOperatorPage from "@/components/operators-page/addOperatorPage";
import EditOPeratorPage from "@/components/operators-page/editOperatorPage";
import EditProductPage from "@/components/products-page/editProductPage";
import NewProductPage from "@/components/products-page/newProductPage";
import { CommonWrapper } from "@/styles/common.styles";
import { ProductsContainer } from "@/styles/products.styles";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

const OperatorPage = () => {
  const router = useRouter();
  const { operatorPage} = router.query;
  const [selectItem, setSelectItem] = useState("");

  const commonProps = {
    selectItem,
    setSelectItem,
    selectDataItems: [
      // "TOURS AND EXPERIENCES",
      // "TRAVEL CONCIERGE",
      // "HOUSEKEEPING",
      // "PROPERTY MANAGEMENT",
      // "DRINKS",
      // "PRIVATE CHEF & MEAL PREP",
      // "WELLNESS AND GROOMING",
      // "SHOPPING & GROCERY RUNS",
      // "NANNY SERVICE",
      // "GIFTSHOP",
      // "RENTABLES",
      // "LAUGGAGE SHOP",
      "ADMIN",
    ],
    menuItemPlaceholder: "Select Category",
  };

  const getContent = () => {
    switch (operatorPage) {
      case "add-operator":
        return <AddOperatorPage {...commonProps} />;
      case "edit-operator":
        return <EditOPeratorPage {...commonProps} />;
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

OperatorPage.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout pageTitle="Better call paul | Operators">{page}</DashBoardLayout>;
};

export default OperatorPage;
