import { StyledInputField } from "@/styles/common.styles";
import {
  ChangeImageButton,
  ChangePhotoArea,
  SwitchTabsContainer,
} from "@/styles/myAccount.styles";
import { Box } from "@mui/material";
import React, { useRef } from "react";
import { HandleSelectCategory } from "../products-page/handleSelectCategory";
import Image from "next/image";
import { myAccProps } from "@/pages/my-account";

const Profile = ({
  formData,
  setFormData,
  selectedImage,
  setSelectedImage,
  userRole,
  setUserRole,
}: myAccProps) => {
  let avatarPlaceHolder = "/userAvatar.svg";

  const fileInputRef: any = useRef(null); // Ref for file input element

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
          selectItem={userRole}
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
              src={selectedImage.previewImage || avatarPlaceHolder}
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
