import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, Menu, MenuItem, Button, Typography, Box } from '@mui/material';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarUrl = user?.avatar ? `http://localhost:8000${user.avatar}` : 'http://localhost:8000/media/avatar/02.png'; // 默认头像

    <Avatar
      src={avatarUrl}
      alt="User Avatar"
      sx={{ width: 40, height: 40, border: '2px solid white', marginRight: 1 }}
    />

 
  

  return (
    <header>
      {isAuthenticated ? (
        <Box display="flex" alignItems="center">
          <Avatar
            src={avatarUrl}
            alt="User Avatar"
            sx={{ width: 40, height: 40, border: '2px solid white', marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ marginRight: 2 }}>{user.username}</Typography>
          <Button variant="outlined" onClick={handleClick}>Menu</Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </Box>
      )}
    </header>
  );
};

export default Header;
