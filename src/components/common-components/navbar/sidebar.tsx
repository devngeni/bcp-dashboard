import React, { useState } from "react";
import { Sidebar, SidebarButtons } from "@/styles/navbar.styles";
import {
  HomeIcon,
  AccountIcon,
  ProductsIcon,
} from "../../../../public/iconSvgs";

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
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  return (
    <Sidebar>
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
