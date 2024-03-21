//http://180.16.254.25:3001/api/provider

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { VendorProps } from "@/pages/vendors";
import { useProductDataContext } from "./products-data";

const vendorsUrl = "/api/provider";

interface vendorsDataProps {
  vendorsData: any[];
  servicesFromVendor: any[];
  singleVendorData: VendorProps;

  addVendorFunc: any;
  deleteVendorFunc: any;
  editVendorFunc: any;

  deleteServiceOfSpecificVendor: any;
  addNewServicetoVendorFunc: any;
  editServiceOfSpecificVendor: any;
}

const VendorsDataContext = createContext({} as vendorsDataProps);

export function useVendorsDataContext() {
  const vendorsData = useContext(VendorsDataContext);
  if (!vendorsData) {
    throw new Error(
      "useVendorsDataContext must be used within a VendorsDataProvider"
    );
  }

  return vendorsData;
}

export const VendorsDataProvider = ({ children }: any) => {
  const router = useRouter();
  const { vendor_id, product_id } = router.query;
  const [vendorsData, setVendorsData] = useState<any[]>([]);
  const [servicesFromVendor, setVendorServices] = useState([]);
  const [singleVendorData, setSingleVendorData] = useState({} as VendorProps);
  const { refetchServices } = useProductDataContext();

  //get vendors data
  const fetchVendorsData = async () => {
    try {
      const res = await fetch(`${vendorsUrl}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("vendors fetch error", error);
    }
  };

  //adding a new vendor(hotel, restaurant.)
  const addVendorFunc = async ({
    vendorName,
    selectedFile,
    description,
  }: any) => {
    try {
      if (!selectedFile || !vendorName || !description) {
        toast.error("All fields are required.");
        return;
      } else if (!selectedFile) {
        toast.error("Please select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "z9q4pq86");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhvrtisdb/auto/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const cloudinaryImageUrl = cloudinaryResponse.data.secure_url;

      const postData = {
        title: vendorName,
        description,
        image: cloudinaryImageUrl,
      };

      // Send POST request using Axios
      const response = await axios.post(`${vendorsUrl}`, postData);
      if (response.data.success) {
        toast.success("Vendor added successfully");
        refetchVendors();
      }
      return response;
    } catch (error) {
      // console.log("vendors fetch error", error);
      toast.error("Failed to add vendor, Try again.");
    }
  };

  //deleting a vendor
  const deleteVendorFunc = async (vendor_id: string) => {
    try {
      const res = await fetch(`${vendorsUrl}/${vendor_id}`, {
        method: "DELETE",

        headers: {
          "Allow-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();
      if (data) {
        toast.success("Vendor deleted successfully");
        refetchVendors();
      }
      return data;
    } catch (error) {
      console.log("vendors fetch error", error);
      toast.error("Failed to delete vendor");
    }
  };

  //updatind details of a vendor PATCH | PUT
  const editVendorFunc = async (
    vendor_id: string,
    vendorName: string,
    description: string,
    existingImagePath: any,
    selectedFile: File | null
  ) => {
    try {
      let cloudinaryImageUrl = existingImagePath; // Set the default image URL to the existing one

      if (selectedFile) {
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

        cloudinaryImageUrl = cloudinaryResponse.data.secure_url;
      } else {
        const postData = {
          title: vendorName,
          description,
          image: cloudinaryImageUrl,
        };

        const response = await axios.put(
          `${vendorsUrl}/${vendor_id}`,
          postData
        );
        if (response.data.success) {
          toast.success("Vendor updated successfully");
          refetchVendors();
        }
        return response;
      }
    } catch (error) {
      console.log("vendors fetch error", error);
      toast.error("Failed to update vendor, Try again.");
    }
  };

  //get vendor services by vendor id
  const getVendorServicesFunc = async (vendor_id: any) => {
    try {
      const res = await fetch(`${vendorsUrl}/${vendor_id}`);
      const vendorServicesData = await res.json();
      return vendorServicesData;
    } catch (error) {
      console.log("vendors fetch error", error);
    }
  };

  //refetch vendor services by vendor id
  const refetchVendorServices = async () => {
    const updatedVendorServices = await getVendorServicesFunc(vendor_id);
    setVendorServices(updatedVendorServices?.data);
    setSingleVendorData(updatedVendorServices?.serviceProvider);
    refetchServices();
  };

  //refetch all vendors get data
  const refetchVendors = async () => {
    const updatedVendors = await fetchVendorsData();
    setVendorsData(updatedVendors?.data);
    refetchServices();
  };

  //add new service to vendor
  const addNewServicetoVendorFunc = async (
    vendor_id: string,
    selectedFile: File | null,
    selectItem: string,
    subtitle: string,
    selectedRadio: string,
    productName: string,
    description: string,
    price: number
  ) => {
    //const res = await fetch(`${vendorsUrl}/single/${vendor_id}/service`
    try {
      if (!selectItem || !productName || !price) {
        toast.error("All fields are required.");
        return;
      } else if (!selectedFile) {
        toast.error("Image file is required.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "z9q4pq86");
      // formData.append("quality", "auto:best");
      // formData.append("transformation", "w_auto,c_scale");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhvrtisdb/auto/upload`,
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

      const response = await axios.post(
        `${vendorsUrl}/single/${vendor_id}/service`,
        serviceData
      );

      if (response.data.success) {
        toast.success("New product added successfully.");
        refetchVendorServices();
      }

      return response;
    } catch (error) {
      toast.error("Error creating product. Please try again.");
    }
  };

  //editing a service of a vendor
  const editServiceOfSpecificVendor = async (
    selectedFile: File | null,
    selectItem: string,
    subtitle: string,
    selectedRadio: string,
    productName: string,
    description: string,
    price: number,
    existingImagePath: any
  ) => {
    try {
      let cloudinaryImageUrl = existingImagePath; // Set the default image URL to the existing one

      if (selectedFile) {
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

        cloudinaryImageUrl = cloudinaryResponse.data.secure_url;
      } else {
        toast.error("No file selected."); // Notify the user if no file is selected
        return;
      }

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
      const response = await axios.put(
        `${vendorsUrl}/single/${vendor_id}/${product_id}`,
        serviceData
      );
      if (response.data.success) {
        toast.success("Product updated successfully.");
        refetchVendorServices();
      }
      return response.data;
    } catch (error) {
      console.log("vendors fetch error", error);
      toast.error("Error creating product. Please try again.");
    }
  };

  const deleteServiceOfSpecificVendor = async (
    product_id: string,
    vendor_id: string
  ) => {
    try {
      const res = await fetch(
        `${vendorsUrl}/single/${vendor_id}/${product_id}`,
        {
          method: "DELETE",
          headers: {
            "Allow-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Service item deleted successfully");
        refetchVendorServices();
      }
      return data;
    } catch (error) {
      console.error("vendors fetch error", error);
      toast.error("Error deleting product. Please try again.");
    }
  };

  useEffect(() => {
    refetchVendors();
  }, []);

  useEffect(() => {
    refetchVendorServices();
  }, [vendor_id]);

  return (
    <VendorsDataContext.Provider
      value={{
        addVendorFunc,
        deleteVendorFunc,
        singleVendorData,
        vendorsData,
        servicesFromVendor,
        editVendorFunc,
        deleteServiceOfSpecificVendor,
        addNewServicetoVendorFunc,
        editServiceOfSpecificVendor,
      }}
    >
      {children}
    </VendorsDataContext.Provider>
  );
};
