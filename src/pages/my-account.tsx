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

export interface myAccProps {
  formData: any;
  setFormData: any;
  selectedImage?: any;
  setSelectedImage?: any;
  userRole?: any;
  setUserRole?: any;
}

const MyAccount: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    confirmEmail: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [userRole, setUserRole] = useState("");
  const [selectedImage, setSelectedImage] = useState({
    file: null,
    previewImage: null,
  });

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  setSelectedImage;

  const tabs = ["Profile", "Settings"];
  const { newPassword, confirmPassword, passwordReset } = useAuth();

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
        toast.error("Passwords do no match");
        return;
      }
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
          userRole={userRole}
          setUserRole={setUserRole}
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
