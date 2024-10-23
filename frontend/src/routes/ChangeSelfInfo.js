import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField } from '@mui/material';
import axios from 'axios';
import '../CSS/ChangeSelfInfoStyles.css';
import { useAuth } from '../context/AuthContext';

const ChangeSelfInfo = ({ onBack }) => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [error, setError] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const { user } = useAuth();

    // 生成头像 URL
    const getAvatarUrl = () => {
        return user && user.avatar ? `http://localhost:8000/${user.avatar}` : '';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/user/ChangeSelfInfo/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
                setUpdatedProfile(response.data);
            } catch (error) {
                console.error('获取个人信息失败', error);
                setError('获取个人信息失败，请稍后重试');
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            Object.keys(updatedProfile).forEach((key) => {
                if (updatedProfile[key] !== undefined && updatedProfile[key] !== '') {
                    formData.append(key, updatedProfile[key]);
                }
            });

            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            const response = await axios.put('http://localhost:8000/api/user/ChangeSelfInfo/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data', // 可以注释掉
                },
            });

            setProfile(response.data);
            setUpdatedProfile(response.data);
            setEditMode(false);
            setError(null);
            setAvatarFile(null);
        } catch (error) {
            console.error('更新个人信息失败', error.response || error);
            setError('更新个人信息失败，请稍后重试');
        }
    };

    if (!profile) return <Typography>加载中...</Typography>;

    return (
        <div>
            <h1>个人信息</h1>
            {error && <Typography color="error">{error}</Typography>}

            <Box className="profile-container">
                <Avatar src={getAvatarUrl()} alt={profile.username} className="profile-avatar" />
                <Typography variant="h5" className="profile-username">{profile.username}</Typography>

                <TableContainer component={Paper} className="profile-table">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>性别</TableCell>
                                <TableCell>
                                    {editMode ? (
                                        <TextField
                                            name="sex"
                                            value={updatedProfile.sex || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        profile.sex
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>地址</TableCell>
                                <TableCell>
                                    {editMode ? (
                                        <TextField
                                            name="address"
                                            value={updatedProfile.address || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        profile.address
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>个人简介</TableCell>
                                <TableCell>
                                    {editMode ? (
                                        <TextField
                                            name="textarea"
                                            value={updatedProfile.textarea || ''}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                        />
                                    ) : (
                                        profile.textarea
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>创建时间</TableCell>
                                <TableCell>
                                    {new Date(profile.created_at).toISOString().slice(0, 7)}  {/* 输出为 YYYY-MM */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>头像</TableCell>
                                <TableCell>
                                    {editMode ? (
                                        <>
                                            <input type="file" onChange={handleFileChange} accept="image/*" />
                                            {avatarFile && <Typography>{avatarFile.name}</Typography>}
                                        </>
                                    ) : (
                                        <Avatar src={getAvatarUrl()} alt={profile.username} />
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box className="button-container">
                    {editMode ? (
                        <Button variant="contained" className="profile-button" onClick={handleUpdate}>
                            确认修改
                        </Button>
                    ) : (
                        <Button variant="outlined" className="profile-button" onClick={() => setEditMode(true)}>
                            修改个人信息
                        </Button>
                    )}
                    <Button variant="outlined" className="profile-button" onClick={onBack}>
                        返回个人信息
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default ChangeSelfInfo;










