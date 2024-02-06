import { createContext, useContext } from "react";

interface ProductDataProps {
  servicesData?: any;
}

// Product Data Context
const ProductDataContext = createContext<ProductDataProps>({});

//useProductDataContext to get all services data
export function useProductDataContext() {
  const productData = useContext(ProductDataContext);
  if (productData === undefined) {
    throw new Error(
      "useProductDataContext must be used within a ProductDataProvider"
    );
  }
  return productData;
}

//ProductDataProvider to wrap all the children components, check in the layout.tsx
export const ProductDataProvider = ({ children, value }: any) => {
  return (
    <ProductDataContext.Provider value={value}>
      {children}
    </ProductDataContext.Provider>
  );
};
