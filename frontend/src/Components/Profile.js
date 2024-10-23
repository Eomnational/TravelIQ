import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../CSS/Profile.css';

const Profile = ({ onEdit, onChangePassword }) => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth(); 

  // 定义默认头像 URL
  const avatarUrl = profile && profile.avatar ? `http://localhost:8000${profile.avatar}`:" ";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/user/me/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('获取个人信息失败', error);
      }
    };

    fetchData();
  }, []);

  if (!profile) return <Typography>加载中...</Typography>;

  return (
    <div className="destination">
      <h1>个人信息</h1>
      <p>Experience the Best Rated Attractions: Unrivaled Beauty Awaits!</p>
      
      <Box className="profile-container">
        <Avatar src={avatarUrl} alt={profile.username} className="profile-avatar" />
        <Typography variant="h5" className="profile-username">{profile.username}</Typography>
        
        <TableContainer component={Paper} className="profile-table">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>性别</TableCell>
                <TableCell>{profile.sex}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>地址</TableCell>
                <TableCell>{profile.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>个人简介</TableCell>
                <TableCell>{profile.textarea}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>创建时间</TableCell>
                <TableCell> {new Date(profile.created_at).toISOString().slice(0, 7)}  {/* 输出为 YYYY-MM */}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box className="button-container">
          <Button variant="outlined" className="profile-button" onClick={onEdit}>
            修改个人信息
          </Button>
          <Button variant="outlined" className="profile-button" onClick={onChangePassword}>
            修改密码
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;







