import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Link } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

const Register = () => {
  const { login } = useAuth(); // 可选：用于注册后登录
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 初始化 useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    // 检查密码是否匹配
    if (password !== confirmPassword) {
      alert('两次密码输入不一致');
      return;
    }

    try {
      // 发送注册请求，使用完整的后端 URL
      await axios.post('http://localhost:8000/api/user/register/', { 
        username,
        password,
      });

      alert("注册成功");

      // 登录并获取 token
      const { data } = await axios.post('http://localhost:8000/api/token/', { 
        username,
        password,
      });

      const userData = { 
        username, 
        avatar: 'http://localhost:8000/media/avatar/02.png', // 默认头像
        token: data.access 
      }; 
      
      login(userData); // 存储用户信息

      // 重定向到主页
      navigate('/'); // 根据你的路由结构进行调整

    } catch (error) {
      console.error('注册错误', error.response ? error.response.data : error.message);
      setError(error.response?.data?.detail || '注册失败，请重试');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        mt={8} 
        p={3} 
        boxShadow={3} 
        borderRadius={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          注册
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="用户名"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="密码"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="确认密码"
            type="password"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Typography color="error" align="center">{error}</Typography>} {/* 显示错误信息 */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            注册
          </Button>
          <Typography variant="body2" align="center" marginTop={2}>
            已有账号?{' '}
            <Link href="/login" underline="hover"> 
              登录账号
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
