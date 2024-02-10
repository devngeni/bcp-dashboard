import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// interface ProductDataProps {
//   services?: any;
//   newProductFunc?: () => void;
//   editFunc?: () => void;
//   deleteFunc?: () => void;
// }

interface ProductDataProps {
  services?: any;
  newProductFunc?: (
    selectedFile: File | null,
    selectItem: string,
    subtitle: string,
    selectedRadio: string,
    productName: string,
    description: string,
    price: number
  ) => void;
  editFunc?: (
    selectedFile: File | null,
    selectItem: string,
    subtitle: string,
    selectedRadio: string,
    productName: string,
    description: string,
    price: number
  ) => void;
  deleteFunc?: (product_id: string) => void;
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

//ProductDataProvider to wrap all the children components, check in the Dashboard layout.tsx
export const ProductDataProvider = ({ children }: any) => {
  const [services, setServices] = useState([]);
  const router = useRouter();

  const newProduct = async (
    selectedFile: File | null,
    selectItem: string,
    subtitle: string,
    selectedRadio: string,
    productName: string,
    description: string,
    price: number
  ) => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "z9q4pq86");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhvrtisdb/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = cloudinaryResponse.data.secure_url;

      const serviceData = {
        category: selectItem,
        subTitle: subtitle,
        tag: selectedRadio,
        content: [
          {
            name: productName,
            description: description,
            imagePath: cloudinaryImageUrl,
            price: price,
          },
        ],
      };

      console.log("Service Data", serviceData);

      const response = await axios.post("/api/service", serviceData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const editProduct = async (
    selectedFile: File | null,
    selectItem: string,
    subtitle: string,
    selectedRadio: string,
    productName: string,
    description: string,
    price: number
  ): Promise<void> => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "z9q4pq86");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhvrtisdb/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = cloudinaryResponse.data.secure_url;

      const serviceData = {
        category: selectItem,
        subTitle: subtitle,
        tag: selectedRadio,
        content: [
          {
            name: productName,
            description: description,
            imagePath: cloudinaryImageUrl,
            price: price,
          },
        ],
      };

      const { product_id } = router.query;
      if (product_id) {
        const response = await axios.put(
          `/api/service/${product_id}`,
          serviceData
        );
        setTimeout(() => {
          router.push("/products");
        }, 3000);
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (product_id: string) => {
    try {
      await axios.delete(`/api/service/${product_id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
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
