import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../CSS/TopRanking.css'; // 导入 CSS 文件

const TopRanking = () => {
  const [scoreTop10Data, setScoreTop10Data] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/home/'); // 替换为你的 API 地址
        const data = response.data.scoreTop10Data || [];
        
        const sortedTop10 = data.sort((a, b) => b.saleCount - a.saleCount).slice(0, 10);
        setScoreTop10Data(sortedTop10);
      } catch (error) {
        console.error('获取数据失败', error);
      }
    };

    fetchData();
  }, []);

  const dataToDisplay = Array.isArray(scoreTop10Data) ? scoreTop10Data : [];
  const startIndex = currentPage * itemsPerPage;
  const currentItems = dataToDisplay.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box className="ranking-card">
      <div className="destination">
      <h1>销量前十排行</h1>
      <p>Discover the Top Ten Attractions: Where Adventure Meets Unforgettable Memories!</p>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">图片</TableCell>
              <TableCell align="center">景区名</TableCell>
              <TableCell align="center">景区等级</TableCell>
              <TableCell align="center">景区省份</TableCell>
              <TableCell align="center">景区评分</TableCell>
              <TableCell align="center">价格</TableCell>
              <TableCell align="center">月销量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={item.id} className="ranking-item">
                <TableCell align="center">{startIndex + index + 1}</TableCell>
                <TableCell align="center">
                  <img src={item.cover} alt={item.title} className="ranking-avatar1" />
                </TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.level}</TableCell>
                <TableCell align="center">{item.province}</TableCell>
                <TableCell align="center">{item.score}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.saleCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          上一页
        </Button>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, 1))} // 只有两页
          disabled={currentPage === 1}
          style={{ marginLeft: '10px' }}
        >
          下一页
        </Button>
      </Box>
    </Box>
  );
};

export default TopRanking;
