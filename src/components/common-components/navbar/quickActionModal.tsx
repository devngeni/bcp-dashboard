import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useAuth } from "@/utils/context/auth-provider";
import Image from "next/image";
import { LogoutIcon } from "../../../../public/iconSvgs";

interface QuickActionModalProps {
  handleClose: () => void;
}

const QuickActionModal: React.FC<QuickActionModalProps> = ({ handleClose }) => {
  const { user, logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={styles.modal}>
        <Box sx={styles.userInfo}>
          <p>{user?.email}</p>
        </Box>
        <Box sx={styles.logoutButton}>
          <Button
            sx={styles.button}
            onClick={logout}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <LogoutIcon fillColor={isHovered ? "red" : ""} />
            Logout
          </Button>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

const styles = {
  modal: {
    position: "absolute",
    top: "calc(100% + 5px)",
    right: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "200px",
    backgroundColor: "#fff",
    boxShadow:
      "0px 4px 6px -2px #0000000D,  0px 10px 15px -3px #0000001A, 0px 0px 0px 1px #0000000D",
    borderRadius: "4px",
  },
  userInfo: {
    padding: "10px 15px",
    borderBottom: "1px solid #D1D5DB",
  },
  logoutButton: {
    padding: "0 15px 10px 15px",
  },
  button: {
    color: "#000",
    textTransform: "none",
    gap: "5px",
    padding: "0",
    ":hover": {
      background: "transparent",
      color: "red",
    },
  },
};

export default QuickActionModal;
