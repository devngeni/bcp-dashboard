import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
      if (!selectItem || !subtitle || !productName || !price) {
        toast.error("All fields are required.");
        return;
      } else if (!selectedFile) {
        toast.error("Image file is required.");
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

      const response = await axios.post("/api/service", serviceData);

      if (response.status === 200) {
        toast.success("New product added successfully.");
        await refetchServices();
      }
      return response;
    } catch (error) {
      toast.error("Error creating product. Please try again.");
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
  ): Promise<any> => {
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
        console.log("Product updated:", response);

        setTimeout(() => {
          router.push("/products");
        }, 3000);

        return response;
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
      //after delete the product, we need to update the state
      await refetchServices();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`/api/service`);
      const data = await response.json();
      const { services } = data;
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  };

  const refetchServices = async () => {
    const updatedServices = await fetchServices();
    setServices(updatedServices);
  };

  useEffect(() => {
    refetchServices(); // Initial fetching of services
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
