import { Box, Modal as MUIModal, styled } from "@mui/material";
import * as React from "react";

const StyledModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: theme.palette.background.paper,
  boxShadow: theme.spacing(2),
  padding: theme.spacing(3),
}));

export function Modal({ open, handleClose, children }) {
  return (
    <MUIModal open={open} onClose={handleClose}>
      <StyledModal width={400}>{children}</StyledModal>
    </MUIModal>
  );
}
