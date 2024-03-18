//http://180.16.254.25:3001/api/provider

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const vendorsUrl = "http://180.16.254.25:3001/api/provider";

interface vendorsDataProps {
  addVendorFunc: () => void;
  deleteVendorFunc: (vendor_id: string) => void;
  getVendorsFunc: () => Promise<{ message: string; data: any[] }>;
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

  const addVendorFunc = async () => {};
  const deleteVendorFunc = async (vendor_id: string) => {};

  //get vendors data
  const getVendorsFunc = async () => {
    try {
      const res = await fetch(`${vendorsUrl}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("vendors fetch error", error);
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

  const addNewServicetoVendorFunc = async (vendor_id: string) => {};

  return (
    <VendorsDataContext.Provider
      value={{
        addVendorFunc,
        deleteVendorFunc,
        getVendorsFunc,
        editVendorFunc,
        getVendorServicesFunc,
        addNewServicetoVendorFunc,
      }}
    >
      {children}
    </VendorsDataContext.Provider>
  );
};
