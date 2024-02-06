import React, { useState } from "react";
import { createContext, useContext } from "react";

export const ProdContext = createContext({} as any);

type ProductDataProps = {
  name: string;
};

export const money = 200;

// Product Data Context
const ProductDataContext = createContext({} as ProductDataProps);

//useProductDataContext to get all services data
export function useProductDataContext() {
  // const productData = useContext(ProductDataContext);
  // if (productData === undefined) {
  //   throw new Error(
  //     "useProductDataContext must be used within a ProductDataProvider"
  //   );
  // }
  // return productData;
  return useContext(ProductDataContext);
}

//ProductDataProvider to wrap all the children components, check in the layout.tsx

export const ProductDataProvider = ({ children }: any) => {
  return (
    <ProdContext.Provider value={{ name: "fred" }}>
      {children}
    </ProdContext.Provider>
  );
};
