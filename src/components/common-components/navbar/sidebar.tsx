import React, { useState } from "react";
import { Sidebar, SidebarButtons } from "@/styles/navbar.styles";
import {
  HomeIcon,
  AccountIcon,
  ProductsIcon,
} from "../../../../public/iconSvgs";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("Dashboard");

  const handleButtonClick = ({ buttonName, path }: any) => {
    setActiveButton(buttonName);
    router.push(`/${path}`);
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
        onClick={() => handleButtonClick({ buttonName: "Dashboard", path: "" })}
      >
        Dashboard
      </HoverableButton>

      <HoverableButton
        icon={ProductsIcon}
        isActive={activeButton === "Products"}
        onClick={() =>
          handleButtonClick({ buttonName: "Products", path: "products" })
        }
      >
        Products
      </HoverableButton>

      <HoverableButton
        icon={AccountIcon}
        isActive={activeButton === "My Account"}
        onClick={() =>
          handleButtonClick({ buttonName: "My Account", path: "my-account" })
        }
      >
        My Account
      </HoverableButton>
    </Sidebar>
  );
};

export default SidebarComponent;
