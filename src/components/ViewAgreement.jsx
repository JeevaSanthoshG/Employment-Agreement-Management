import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewAgreement = ({ open, handleClose, agreement }) => {
  if (!agreement) return null; // Return null if agreement is null

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: "#f4f6f8",
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" align="center" color="primary">
          Agreement Details
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box p={2}>
          <Typography variant="subtitle1">
            <strong>Employee Name:</strong> {agreement.employeeName}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Department:</strong> {agreement.department}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Position:</strong> {agreement.position}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Agreement Date:</strong> {agreement.agreementDate}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAgreement;
