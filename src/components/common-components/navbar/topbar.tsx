import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  Notification_User_Box,
  SearchBar,
  Topbar,
} from "@/styles/navbar.styles";
import Image from "next/image";

import SearchIcon from "../../../../public/searchIco.svg";
import NotificationIcon from "../../../../public/bellIcon.svg";
import ArrowIcon from "../../../../public/arrowDownIcon.svg";
import QuickActionModal from "./quickActionModal";
import { useAuth } from "@/utils/context/auth-provider";

let avatarPlaceHolder = "/userAvatar.svg";

interface TopbarProps {
  showSearchComponent?: boolean;
}

const TopbarComponent = ({ showSearchComponent }: TopbarProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Topbar>
      {showSearchComponent && (
        <SearchBar>
          <Image src={SearchIcon} alt="search" />
          <input type="text" placeholder="Search" />
        </SearchBar>
      )}

      <Notification_User_Box open={open}>
        <Box className="notification_icon">
          <Image src={NotificationIcon} alt="notification" />
        </Box>

        <Box className="user_icon">
          <Image
            src={user?.photo || avatarPlaceHolder}
            alt="user"
            width={32}
            height={32}
          />
        </Box>
        <Box className="arrow" onClick={toggleOpen}>
          <Image src={ArrowIcon} alt="arrow" />
        </Box>
      </Notification_User_Box>

      {open && <QuickActionModal handleClose={() => setOpen(false)} />}
    </Topbar>
  );
};

export default TopbarComponent;
