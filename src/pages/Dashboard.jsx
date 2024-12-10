import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Dialog,
  Slide,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import { fetchAgreements } from "../features/agreements/agreementsSlice";
import CreateAgreement from "../components/CreateAgreement";
import ViewAgreement from "../components/ViewAgreement";
import UpdateAgreement from "../components/UpdateAgreement";
import { format } from "date-fns";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const agreements = useSelector((state) => state.agreements.items);
  const status = useSelector((state) => state.agreements.status);
  const error = useSelector((state) => state.agreements.error);

  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentAgreement, setCurrentAgreement] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAgreements());
    }
  }, [status, dispatch]);

  const handleCreateAgreement = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleViewAgreement = (agreement) => {
    setCurrentAgreement(agreement);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleUpdateAgreement = (agreement) => {
    setCurrentAgreement(agreement);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px", height: "90vh" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Employment Agreements</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAgreement}
        >
          Create Agreement
        </Button>
      </Box>
      <Dialog
        open={openCreate}
        TransitionComponent={Transition}
        onClose={handleCloseCreate}
        fullWidth
        maxWidth="sm"
      >
        <CreateAgreement open={openCreate} handleClose={handleCloseCreate} />
      </Dialog>
      <ViewAgreement
        open={openView}
        handleClose={handleCloseView}
        agreement={currentAgreement}
      />
      <Dialog
        open={openUpdate}
        TransitionComponent={Transition}
        onClose={handleCloseUpdate}
        fullWidth
        maxWidth="sm"
      >
        <UpdateAgreement
          open={openUpdate}
          handleClose={handleCloseUpdate}
          agreement={currentAgreement}
        />
      </Dialog>
      {status === "loading" && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">Error: {error}</Typography>}
      {status === "succeeded" && (
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "87vh",
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Employee Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Department</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Position</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Agreement Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agreements.map((agreement) => (
                <TableRow key={agreement.id} hover>
                  <TableCell>{agreement.employeeName}</TableCell>
                  <TableCell>{agreement.department}</TableCell>
                  <TableCell>{agreement.position}</TableCell>
                  <TableCell>
                    {format(new Date(agreement.agreementDate), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewAgreement(agreement)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdateAgreement(agreement)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Dashboard;
