import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Star from '@mui/icons-material/Star'; // 导入填充星星图标
import StarBorder from '@mui/icons-material/StarBorder'; // 导入空星星图标

const RatingStars = ({ rating, setRating }) => {
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <Box display="flex" alignItems="center" marginBottom={2}>
      {[...Array(5)].map((_, index) => (
        <IconButton
          key={index}
          onClick={() => handleStarClick(index)}
          style={{ padding: 0 }} // 设置为0以移除内边距
        >
          {index < rating ? <Star style={{ color: '#FFD700' }} /> : <StarBorder />}
        </IconButton>
      ))}
      <Typography variant="body1" style={{ marginLeft: '10px' }}>
        评分: {rating}
      </Typography>
    </Box>
  );
};

export default RatingStars;


