import React, { useEffect, useState } from "react";
import { Sidebar, SidebarButtons } from "@/styles/navbar.styles";
import {
  HomeIcon,
  AccountIcon,
  ProductsIcon,
  OperatorsIcon,
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

  useEffect(() => {
    // Update activeButton based on the current path
    const currentPath = router.pathname;

    if (currentPath === "/dashboard") {
      setActiveButton("Dashboard");
    } else if (currentPath.startsWith("/products")) {
      setActiveButton("Products");
    } else if (currentPath === "/my-account") {
      setActiveButton("My Account");
    } else if (currentPath === "/operators") {
      setActiveButton("Operators");
    }
  }, [router.pathname]);

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

          "@media (max-width: 899px)": {
            display: "none",
          },
        }}
      >
        BETTER CALL PAUL
      </Box>
      <HoverableButton
        icon={HomeIcon}
        isActive={activeButton === "Dashboard"}
        onClick={() => handleButtonClick({ buttonName: "Dashboard", path: "" })}
      >
        <span>Dashboard</span>
      </HoverableButton>

      <HoverableButton
        icon={ProductsIcon}
        isActive={activeButton === "Products"}
        onClick={() =>
          handleButtonClick({ buttonName: "Products", path: "products" })
        }
      >
        <span>Products</span>
      </HoverableButton>

      <HoverableButton
        icon={AccountIcon}
        isActive={activeButton === "My Account"}
        onClick={() =>
          handleButtonClick({ buttonName: "My Account", path: "my-account" })
        }
      >
        <span>My Account</span>
      </HoverableButton>

      {/* <HoverableButton
        icon={OperatorsIcon}
        isActive={activeButton === "Operators"}
        onClick={() =>
          handleButtonClick({ buttonName: "Operators", path: "operators" })
        }
      >
        <span>Operators</span>
      </HoverableButton> */}
    </Sidebar>
  );
};

export default SidebarComponent;
