import React, { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { CommonWrapper, YelloWButton } from "@/styles/common.styles";
import DashBoardLayout from "@/components/layout/dashboardLayout";
import { TabButton, TabsBar } from "@/styles/myAccount.styles";
import { Box } from "@mui/material";
import Profile from "@/components/my-account-page/profile";
import Settings from "@/components/my-account-page/settings";
import { useAuth } from "@/utils/context/auth-provider";
import toast from "react-hot-toast";
import Loader from "@/components/common-components/loader";
import axios from "axios";

export interface myAccProps {
  formData: {
    name: string;
    email: string;
    confirmEmail: string;
    phone: string;
    photo: string;
    role: string;
  };
  setFormData: any;
  selectedImage?: any;
  setSelectedImage?: any;
  userRole?: any;
  setUserRole?: any;
}

const MyAccount: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateProfile, newPassword, confirmPassword, passwordReset } =
    useAuth();

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    confirmEmail: "",
    phone: user?.phone ?? "",
    photo: user?.photo ?? "",
    role: user?.role ?? "",
  });

  const [selectedImage, setSelectedImage] = useState({
    file: null,
    previewImage: null,
  });

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  setSelectedImage;

  const tabs = ["Profile", "Settings"];

  const handleProfileUpdate = async () => {
    try {
      if (formData.email !== formData.confirmEmail) {
        toast.error("Emails do not match");
        return;
      }

      setIsLoading(true);
      let photoUrl = formData.photo;
      if (!selectedImage.file) {
        photoUrl = formData.photo;
      } else {
        const formDataForUpload = new FormData();
        formDataForUpload.append("file", selectedImage.file);
        formDataForUpload.append("upload_preset", "z9q4pq86");

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dhvrtisdb/image/upload`,
          formDataForUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        photoUrl = cloudinaryResponse.data.secure_url;
      }

      const updatedFormData = { ...formData, photo: photoUrl };

      const response = await updateProfile(updatedFormData);

      if (response.status === 200) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Error updating profile");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSaveUserDetails = async () => {
    if (activeTab === "Settings") {
      // call password reset
      setIsLoading(true);
      if (confirmPassword === newPassword) {
        const passwordChanged = await passwordReset();

        if (passwordChanged) {
          setIsLoading(false);
          toast.success("Password changed successfully");
        } else {
          setIsLoading(false);
          toast.error("Password change failed, log out and log in again");
        }
      } else {
        setIsLoading(false);
        toast.error("Passwords do not match");
        return;
      }
    } else if (activeTab === "Profile") {
      await handleProfileUpdate();
    }
  };

  return (
    <CommonWrapper>
      <h1>My Account</h1>
      <TabsBar>
        <Box className="sub_box">
          {tabs.map((tabName) => (
            <TabButton
              key={tabName}
              className={activeTab === tabName ? "active" : ""}
              onClick={() => handleTabClick(tabName)}
            >
              {tabName}
            </TabButton>
          ))}
        </Box>
        <Box className="sub_box">
          <YelloWButton type="submit" onClick={handleSaveUserDetails}>
            {isLoading ? <Loader /> : "Save"}
          </YelloWButton>
        </Box>
      </TabsBar>
      {activeTab === "Profile" ? (
        <Profile
          formData={formData}
          setFormData={setFormData}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      ) : activeTab === "Settings" ? (
        <Settings />
      ) : null}
    </CommonWrapper>
  );
};

MyAccount.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout pageTitle="Better call paul | My Account">
      {page}
    </DashBoardLayout>
  );
};

export default MyAccount;
