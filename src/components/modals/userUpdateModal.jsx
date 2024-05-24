import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UpdateFormModal = ({
  open,
  handleClose,
  handleUpdateProfile,
  updatedUserDetails,
  handleInputChange,
  originalUserDetails, 
  email
}) => {
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [noUpdates, setNoUpdates] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      updatedUserDetails.name !== "" && updatedUserDetails.mobileNumber !== "";
    setFieldsFilled(allFieldsFilled);
  }, [updatedUserDetails, email]);

  useEffect(() => {
    setNoUpdates(false); 
  }, [open]);

  const handleModalClose = () => {
    handleInputChange({ target: { name: "name", value: "" } });
    handleInputChange({ target: { name: "mobileNumber", value: "" } });
    setFieldsFilled(false);
    handleClose();
  };

  const handleUpdateButtonClick = () => {
    if (!fieldsFilled) {
      alert("Please fill out all the fields!");
      return;
    }

    const noChangeMade =
      updatedUserDetails.name === originalUserDetails.name &&
      updatedUserDetails.mobileNumber === originalUserDetails.mobileNumber;

    if (noChangeMade) {
      setNoUpdates(true);
    } else {
      handleUpdateProfile();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: 350,
            p: 4,
            backgroundColor: "background.paper",
            borderRadius: 1,
            boxShadow: 4,
            position: "relative",
            "& .MuiTextField-root": {
              mb: 2,
            },
            "& .MuiButton-root": {
              mt: 2,
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            label="Name"
            name="name"
            value={updatedUserDetails.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            disabled
            fullWidth
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={updatedUserDetails.mobileNumber}
            onChange={handleInputChange}
            required
            fullWidth
          />
          {!fieldsFilled && (
            <p style={{ color: "red" }}>Please fill out all the fields!</p>
          )}
          {noUpdates && (
            <p style={{ color: "orange" }}>No updates made!</p>
          )}
          <Button
            variant="contained"
            onClick={handleUpdateButtonClick}
            fullWidth
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateFormModal;

