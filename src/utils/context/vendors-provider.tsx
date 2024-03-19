//http://180.16.254.25:3001/api/provider

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";

// const vendorsUrl = "http://180.16.254.25:3001/api/provider";
const vendorsUrl = "http://localhost:3000/api/provider";

interface vendorsDataProps {
  vendorsData: any[];
  addVendorFunc: any;
  deleteVendorFunc: any;
  editVendorFunc: () => any;
  getVendorServicesFunc: any;
  addNewServicetoVendorFunc: (vendor_id: string) => void;
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
  const [vendor_id, setVendor_id] = useState("");
  const [vendorsData, setVendorsData] = useState<any[]>([]);

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
      console.log("data", {
        title: vendorName,
        description,
        image: selectedFile,
      });
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

      const postData = {
        title: vendorName,
        description,
        image: cloudinaryImageUrl,
      };

      // Send POST request using Axios
      const response = await axios.post(vendorsUrl, postData, {
        headers: {
          "Allow-Control-Allow-Origin": "*",
        },
      });
      console.log("response", response);
    } catch (error) {
      console.log("vendors fetch error", error);
      toast.error("Failed to add vendor");
    }
  };

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

  const editVendorFunc = async () => {};

  //get vendor services by vendor id
  const getVendorServicesFunc = async (vendor_id: any) => {
    try {
      const res = await fetch(`${vendorsUrl}/${vendor_id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("vendors fetch error", error);
    }
  };

  const refetchVendors = async () => {
    const updatedVendors = await fetchVendorsData();
    setVendorsData(updatedVendors.data);
  };

  useEffect(() => {
    refetchVendors();
  }, []);

  const addNewServicetoVendorFunc = async (vendor_id: string) => {};

  return (
    <VendorsDataContext.Provider
      value={{
        addVendorFunc,
        deleteVendorFunc,
        vendorsData,
        editVendorFunc,
        getVendorServicesFunc,
        addNewServicetoVendorFunc,
      }}
    >
      {children}
    </VendorsDataContext.Provider>
  );
};
