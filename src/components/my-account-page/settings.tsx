import React from "react";
import { SwitchTabsContainer } from "@/styles/myAccount.styles";
import { StyledInputField } from "@/styles/common.styles";
import { myAccProps } from "@/pages/my-account";

const Settings = ({ formData, setFormData }: myAccProps) => {
  return (
    <SwitchTabsContainer>
      <h1>Settings</h1>
      <StyledInputField sx={{ mt: "20px", width: "431px" }}>
        <label>Old Password</label>
        <input
          type="text"
          value={formData.oldPassword}
          onChange={(e) =>
            setFormData({ ...formData, oldPassword: e.target.value })
          }
        />
      </StyledInputField>

      <StyledInputField sx={{ mt: "20px", width: "431px" }}>
        <label>New Password</label>
        <input
          type="text"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />
      </StyledInputField>

      <StyledInputField sx={{ mt: "20px", width: "431px" }}>
        <label>Confirm New Password</label>
        <input
          type="text"
          value={formData.confirmNewPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmNewPassword: e.target.value })
          }
        />
      </StyledInputField>
    </SwitchTabsContainer>
  );
};

export default Settings;
