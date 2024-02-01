import React, { useState } from "react";
import { Sidebar, SidebarButtons } from "@/styles/navbar.styles";
import {
  HomeIcon,
  AccountIcon,
  ProductsIcon,
} from "../../../../public/iconSvgs";
import { Box } from "@mui/material";

const HoverableButton = ({ children, icon, isActive, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SidebarButtons
      className={isActive ? "active" : ""}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon({ fillColor: isHovered || isActive ? "" : "#90BDB6" })}
      {children}
    </SidebarButtons>
  );
};

const SidebarComponent = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");

  const handleButtonClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  return (
    <Sidebar>
      <Box
        sx={{
          color: "#FFFFFF",
          fontFamily: "Inter",
          fontSize: "14px",
          margin: "16px 0 10px 0",
          width: "100%",
          // textAlign: "center",
          height: "20px",
        }}
      >
        BETTER CALL PAUL
      </Box>
      <HoverableButton
        icon={HomeIcon}
        isActive={activeButton === "Dashboard"}
        onClick={() => handleButtonClick("Dashboard")}
      >
        Dashboard
      </HoverableButton>

      <HoverableButton
        icon={ProductsIcon}
        isActive={activeButton === "Products"}
        onClick={() => handleButtonClick("Products")}
      >
        Products
      </HoverableButton>

      <HoverableButton
        icon={AccountIcon}
        isActive={activeButton === "My Account"}
        onClick={() => handleButtonClick("My Account")}
      >
        My Account
      </HoverableButton>
    </Sidebar>
  );
};

export default SidebarComponent;
