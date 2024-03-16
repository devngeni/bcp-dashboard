import { Box, Button, ClickAwayListener, Modal } from "@mui/material";
import React from "react";
import Loader from "../common-components/loader";

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  isLoading?: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  styles?: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isDeleteModalOpen,
  isLoading,
  handleClose,
  handleDelete,
  styles,
}) => {
  return (
    <>
      {isDeleteModalOpen && (
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            left: "0",
            top: "0",
            zIndex: 102,
            ...styles
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 8px 0px #00000014",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255)",
                gap: "10px",
                borderRadius: "4px",

                h1: {
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Montserrat",
                  color: "#111827",
                },

                p: {
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Inter",
                  color: "#6B7280",
                },
              }}
            >
              <h1>Confirm Actions</h1>
              <p>Are you sure you want to delete this product?</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    width: "100px",
                    backgroundColor: "transparent",
                    color: "#111827",
                    border: "1px solid #E5E7EB",

                    ":hover": {
                      backgroundColor: "#E5E7EB",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{ width: "100px" }}
                >
                  {isLoading ? <Loader /> : "Delete"}
                </Button>
              </Box>
            </Box>
          </ClickAwayListener>
        </Box>
      )}
    </>
  );
};

export default DeleteModal;
