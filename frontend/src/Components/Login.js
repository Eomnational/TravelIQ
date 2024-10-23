import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, Container } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', {
            username,
            password,
        });

        const { access } = response.data;
        localStorage.setItem('token', access);
        // 获取用户信息
        const userInfoResponse = await axios.get('http://localhost:8000/api/user/me/', {
            headers: { Authorization: `Bearer ${access}` },
        });


        const userData = {
            username,
            token: access,
            avatar: userInfoResponse.data.avatar, // 获取头像 URL
        };

        login(userData);
        setError('');
        const from = location.state?.from || '/';
        setRedirect(true);
        navigate(from);
    } catch (err) {
        setError('用户名或密码错误');
    }
};


  if (redirect) {
    const from = location.state?.from || '/';
    return <Navigate to={from} />;
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        登录
      </Typography>
      <TextField
        label="用户名"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="密码"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        登录
      </Button>
      <Typography variant="body2" align="center" marginTop={2}>
        还没有账号?{' '}
        <Link href="/register" underline="hover">
          注册账号
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
