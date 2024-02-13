import { StyledInputField } from "@/styles/common.styles";
import {
  ChangeImageButton,
  ChangePhotoArea,
  SwitchTabsContainer,
} from "@/styles/myAccount.styles";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { HandleSelectCategory } from "../products-page/handleSelectCategory";
import Image from "next/image";
import { myAccProps } from "@/pages/my-account";
import { useAuth } from "@/utils/context/auth-provider";
import axios from "axios";

const Profile = ({
  selectedImage,
  setSelectedImage,
  userRole,
  setUserRole,
}: myAccProps) => {
  let avatarPlaceHolder = "/userAvatar.svg";

  const fileInputRef: any = useRef(null); // Ref for file input element
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    photo: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id;
        const response = await axios.get(`/api/user/profile/${userId}`);
        const userData = response.data.User;
        console.log("User Data", formData);
        setFormData(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, setUserRole]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickChange = () => {
    fileInputRef.current.click(); // Trigger click on file input
  };

  const handleProfileUpdate = async () => {
    try {
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

      const photoUrl = cloudinaryResponse.data.secure_url;

      const updatedFormData = { ...formData, photo: photoUrl };

      const response = await updateProfile(updatedFormData);
      console.log("Data Saved", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwitchTabsContainer>
      <h1>Profile</h1>
      <StyledInputField sx={{ mt: "20px", width: "747px" }}>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </StyledInputField>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <StyledInputField sx={{ mt: "20px", width: "361px" }}>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </StyledInputField>
        <StyledInputField sx={{ mt: "20px", width: "361px" }}>
          <label>Confirm email</label>
          {/* Add input field for confirm email */}
          <input
            type="email"
            value={formData.confirmEmail}
            onChange={(e) =>
              setFormData({ ...formData, confirmEmail: e.target.value })
            }
          />
        </StyledInputField>
      </Box>

      <StyledInputField sx={{ mt: "20px", width: "361px" }}>
        <label>Phone</label>
        <input
          type="number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </StyledInputField>

      <StyledInputField sx={{ mt: "20px", width: "361px" }}>
        <label>Assigned role</label>
        <HandleSelectCategory
          menuItemPlaceholder="set user role"
          selectItem={formData.role}
          setSelectItem={setUserRole}
          selectDataItems={["Admin"]}
        />
      </StyledInputField>

      <ChangePhotoArea>
        <label>Photo</label>
        <Box className="the_box">
          <Box className="image_area">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <Image
              src={
                formData.photo ||
                selectedImage.previewImage ||
                avatarPlaceHolder
              }
              alt="user-avatar"
              width={48}
              height={48}
            />
          </Box>
          <ChangeImageButton onClick={handleClickChange}>
            Change
          </ChangeImageButton>
        </Box>
      </ChangePhotoArea>
    </SwitchTabsContainer>
  );
};

export default Profile;
