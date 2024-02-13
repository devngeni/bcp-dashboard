import React, { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { CommonWrapper, YelloWButton } from "@/styles/common.styles";
import DashBoardLayout from "@/components/layout/dashboardLayout";
import { TabButton, TabsBar } from "@/styles/myAccount.styles";
import { Box } from "@mui/material";
import Profile from "@/components/my-account-page/profile";
import Settings from "@/components/my-account-page/settings";
import { useAuth } from "@/utils/context/auth-provider";

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

  const tabs = ["Profile", "Settings"];
  const { newPassword, confirmPassword, passwordReset } = useAuth();

  const HandleSaveUserDetails = async () => {
    if (activeTab === "Settings") {
      // call password reset
      if (confirmPassword === newPassword) {
        const result = await passwordReset();

        result
          ? alert("Successfully changed password")
          : alert("something went wrong while changing password");
      } else {
        alert("Passwords do no match");
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
          <YelloWButton type="submit" onClick={HandleSaveUserDetails}>
            Save
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
