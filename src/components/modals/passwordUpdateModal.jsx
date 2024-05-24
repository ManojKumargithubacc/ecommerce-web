import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PasswordFormModal = ({
  open,
  handleClose,
  handleUpdatePassword,
  passwords,
  handlePasswordChange,
  actualCurrentPassword, 
}) => {
  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter and one number

  useEffect(() => {
    if (!open) {
      handlePasswordChange({ target: { name: "currentPassword", value: "" } });
      handlePasswordChange({ target: { name: "newPassword", value: "" } });
      handlePasswordChange({ target: { name: "confirmPassword", value: "" } });
      setFieldsEmpty(false);
      setCurrentPasswordInvalid(false);
      setPasswordInvalid(false);
    }
  }, [open, handlePasswordChange]);

  const passwordsMatch =
    passwords.newPassword !== "" &&
    passwords.confirmPassword !== "" &&
    passwords.newPassword === passwords.confirmPassword;

  const isPasswordValid = (password) => {
    return passwordPattern.test(password);
  };

  const handleUpdateButtonClick = () => {
    const isAnyFieldEmpty =
      passwords.currentPassword === "" ||
      passwords.newPassword === "" ||
      passwords.confirmPassword === "";

    setFieldsEmpty(isAnyFieldEmpty);

    if (!isAnyFieldEmpty) {
      if (!isPasswordValid(passwords.newPassword)) {
        setPasswordInvalid(true);
      } else {
        setPasswordInvalid(false);
        if (passwords.currentPassword !== actualCurrentPassword) {
          setCurrentPasswordInvalid(true);
        } else {
          setCurrentPasswordInvalid(false);
          handleUpdatePassword();
        }
      }
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
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            required
            fullWidth
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            required
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            required
            fullWidth
          />
          {fieldsEmpty && (
            <p style={{ color: "red" }}>Please fill out all the fields!</p>
          )}
          {!passwordsMatch && passwords.newPassword !== "" && passwords.confirmPassword !== "" && (
            <p style={{ color: "red" }}>Passwords do not match!</p>
          )}
          {passwordsMatch && !passwordInvalid && (
            <p style={{ color: "green" }}>Passwords match!</p>
          )}
          {passwordInvalid && (
            <p style={{ color: "red" }}>
              Password must be at least 8 characters long and include at least one letter and one number!
            </p>
          )}
          {currentPasswordInvalid && (
            <p style={{ color: "red" }}>Current password is incorrect!</p>
          )}
          <Button
            variant="contained"
            onClick={handleUpdateButtonClick}
            fullWidth
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PasswordFormModal;
