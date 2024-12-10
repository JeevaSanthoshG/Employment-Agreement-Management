import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createAgreement } from "../features/agreements/agreementsSlice";

// Validation schema
const schema = yup.object().shape({
  employeeName: yup.string().required("Employee Name is required"),
  department: yup.string().required("Department is required"),
  position: yup.string().required("Position is required"),
  agreementDate: yup
    .date()
    .required("Agreement Date is required")
    .typeError("Invalid date format"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAgreement = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      agreementDate: new Date(data.agreementDate).toISOString().split("T")[0],
    };
    dispatch(createAgreement(formattedData));
    handleClose();
  };

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
          Create New Agreement
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="employeeName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Employee Name"
                fullWidth
                margin="normal"
                error={!!errors.employeeName}
                helperText={
                  errors.employeeName ? errors.employeeName.message : ""
                }
              />
            )}
          />
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Department"
                fullWidth
                margin="normal"
                error={!!errors.department}
                helperText={errors.department ? errors.department.message : ""}
              />
            )}
          />
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Position"
                fullWidth
                margin="normal"
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
              />
            )}
          />
          <Controller
            name="agreementDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Agreement Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                error={!!errors.agreementDate}
                helperText={
                  errors.agreementDate ? errors.agreementDate.message : ""
                }
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAgreement;
