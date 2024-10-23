import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import '../CSS/ChangeSelfInfoStyles.css';

const ChangePassword = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('新密码和确认密码不匹配');
      return;
    }

    if (newPassword.length < 6) {
      setError('新密码必须至少包含6个字符');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8000/api/user/ChangePassword/', {
        current_password: currentPassword,
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 保存新的 JWT
      localStorage.setItem('token', response.data.access);
      
      // 设置 Snackbar 消息和状态
      setSnackbarMessage('修改密码成功！');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // 重置输入框
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
    } catch (error) {
      console.error('修改密码失败', error);
      setSnackbarMessage('修改密码失败，请稍后重试');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <h1>修改密码</h1>
      {error && <Typography color="error">{error}</Typography>}

      <Box className="profile-container">
        <TextField
          label="当前密码"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="新密码"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="确认新密码"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box className="button-container">
          <Button variant="contained" className="profile-button" onClick={handleChangePassword}>
            确认修改
          </Button>
          <Button variant="outlined" className="profile-button" onClick={onBack}>
            返回
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChangePassword;





