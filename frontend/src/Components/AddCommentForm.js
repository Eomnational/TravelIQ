import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button
} from '@mui/material'; // 导入 MUI 组件
import Star from '@mui/icons-material/Star'; // 导入填充星星图标
import StarBorder from '@mui/icons-material/StarBorder'; // 导入空星星图标

const TravelInfoPage = () => {
  const { id } = useParams(); // 获取 URL 中的 id
  const navigate = useNavigate(); // 初始化导航
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);  // 存储评分
  const [travelInfo, setTravelInfo] = useState({}); // 存储旅行信息
  const [errorMessage, setErrorMessage] = useState(''); // 错误信息

  // 获取旅行信息
  useEffect(() => {
    const fetchTravelInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/comments/add/${id}/`); // 假设后端有这个 API
        setTravelInfo(response.data); // 假设返回的数据是旅行信息
      } catch (error) {
        setErrorMessage('获取旅行信息失败');
        console.error('获取旅行信息失败', error);
      }
    };

    fetchTravelInfo();
  }, [id]);

  // 提交评论
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !rating) {
      alert('评分和评论内容不能为空');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // 从 localStorage 获取 JWT 令牌
      const response = await axios.post(`http://localhost:8000/api/comments/add/${id}/`, {
        rate: rating,
        content: content,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // 在请求头中添加 JWT 令牌
        }
      });

      if (response.data.message === '评论添加成功') {
        alert('评论成功！');
        setContent(''); // 重置评论内容
        setRating(0);   // 重置评分
        navigate(-1);   // 返回上一个页面
      } else {
        alert('评论添加失败，请重试。');
      }
    } catch (error) {
      console.error('提交评论失败', error);
      alert('提交评论失败，请检查网络或后端服务。');
    }
  };

  // 处理评分点击
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        旅游信息
      </Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {/* 旅游信息卡片 */}
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardMedia
          component="img"
          alt="旅游地封面"
          height="200"
          image={travelInfo.cover}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {travelInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            详情地址: {travelInfo.detailAddress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            评分: {travelInfo.score} | 销量: {travelInfo.saleCount}
          </Typography>
        </CardContent>
      </Card>

      {/* 评论表单 */}
      <Typography variant="h6" gutterBottom>
        添加评论
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography variant="body2" component="label" htmlFor="comment">
            评论内容:
          </Typography>
          <textarea
            id="comment"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', height: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Box>

        {/* 评分组件 */}
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

        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            提交评论
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default TravelInfoPage;








