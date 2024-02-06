import { createContext, useContext } from "react";

interface ProductDataProps {
  services?: any;
  name: string;
  deleteFunc: () => void;
  editFunc: () => void;
}

// Product Data Context
const ProductDataContext = createContext({} as ProductDataProps);

//useProductDataContext to get all services data
export function useProductDataContext() {
  return useContext(ProductDataContext);
}

//ProductDataProvider to wrap all the children components, check in the layout.tsx
export const ProductDataProvider = ({ children, value }: any) => {
  return (
    <ProductDataContext.Provider value={value}>
      {children}
    </ProductDataContext.Provider>
  );
};
