import React, { useState } from "react";
import { SwitchTabsContainer } from "@/styles/myAccount.styles";
import { StyledInputField } from "@/styles/common.styles";
import { myAccProps } from "@/pages/my-account";
import { useAuth } from "@/utils/context/auth-provider";

const Settings = () => {
  const { newPassword, oldPassword, confirmPassword, handlePasswordChange } =
    useAuth();

  return (
    <SwitchTabsContainer>
      <h1>Settings</h1>

      <StyledInputField sx={{ mt: "20px", width: "431px" }}>
        <label>Old Password</label>
        <input
          type="text"
          value={oldPassword}
          name="oldPassword"
          onChange={handlePasswordChange}
        />
      </StyledInputField>

      <StyledInputField sx={{ mt: "20px", width: "431px" }}>
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handlePasswordChange}
        />
      </StyledInputField>

      <StyledInputField sx={{ mt: "20px", width: "431px" }}>
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handlePasswordChange}
        />
      </StyledInputField>
    </SwitchTabsContainer>
  );
};

export default Settings;
