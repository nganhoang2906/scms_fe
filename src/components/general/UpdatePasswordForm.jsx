import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updatePassword } from "@/services/general/UserService";

const UpdatePasswordForm = ({ userId, onSuccess }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!form.currentPassword.trim()) errors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    if (!form.newPassword.trim()) errors.newPassword = "Vui lòng nhập mật khẩu mới";
    if (form.newPassword.length < 8) errors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    if (!form.confirmPassword.trim()) errors.confirmPassword = "Vui lòng nhập xác nhận mật khẩu";
    if (form.confirmPassword !== form.newPassword) errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await updatePassword(userId, form, token);
      alert("Đổi mật khẩu thành công!");
      onSuccess?.();
    } catch (error) {
      alert(error.response?.data?.message || "Đổi mật khẩu thất bại!");
    }
  };

  const renderPasswordField = (label, name, value, onToggleShow, showPassword, error, helperText) => (
    <TextField
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={helperText}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onToggleShow}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        Thay đổi mật khẩu:
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {renderPasswordField(
          "Mật khẩu hiện tại",
          "currentPassword",
          form.currentPassword,
          () => setShowCurrent(!showCurrent),
          showCurrent,
          errors.currentPassword,
          errors.currentPassword
        )}
        {renderPasswordField(
          "Mật khẩu mới",
          "newPassword",
          form.newPassword,
          () => setShowNew(!showNew),
          showNew,
          errors.newPassword,
          errors.newPassword
        )}
        {renderPasswordField(
          "Xác nhận mật khẩu mới",
          "confirmPassword",
          form.confirmPassword,
          () => setShowConfirm(!showConfirm),
          showConfirm,
          errors.confirmPassword,
          errors.confirmPassword
        )}

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="default" onClick={onSuccess}>
            Hủy
          </Button>
          <Button variant="contained" color="default" onClick={handleSubmit}>
            Cập nhật mật khẩu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatePasswordForm;
