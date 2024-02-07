import { createContext, useContext, useEffect, useState } from "react";

interface ProductDataProps {
  services?: any;
  newProductFunc?: () => void;
  editFunc?: () => void;
  deleteFunc?: () => void;
}

// Product Data Context
const ProductDataContext = createContext({} as ProductDataProps);

//useProductDataContext to get all services data
export function useProductDataContext() {
  const productData = useContext(ProductDataContext);
  if (!productData) {
    throw new Error(
      "useProductDataContext must be used within a ProductDataProvider"
    );
  }

  return productData;
}

//ProductDataProvider to wrap all the children components, check in the Dashboardlayout.tsx
export const ProductDataProvider = ({ children }: any) => {
  const [services, setServices] = useState([]);

  function newProduct() {} // Replace with your new product function
  function editProduct() {} // Replace with your edit product function
  function deleteProduct() {} // Replace with your delete product function

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/service`);
      const data = await response.json();
      const { services } = data;
      setServices(services);
    })();
  }, []);

  return (
    <ProductDataContext.Provider
      value={{
        services,
        deleteFunc: deleteProduct,
        editFunc: editProduct,
        newProductFunc: newProduct,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};
