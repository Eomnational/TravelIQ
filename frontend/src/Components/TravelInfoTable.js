import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, CircularProgress, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import '../CSS/TopRanking.css'; 

const TravelInfoTable = () => {
  const [travelData, setTravelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键字
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8000/api/get-travel-info/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.tableData || [];
        setTravelData(data);
        setFilteredData(data); // 默认显示所有数据
        setLoading(false);
      } catch (error) {
        console.error('获取数据失败', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (event) => {
    const pageNumber = Math.max(0, Math.min(Number(event.target.value) - 1, totalPages - 1));
    setCurrentPage(pageNumber);
  };

  const handleCommentClick = (id) => {
    navigate(`/add-comment/${id}/`); 
  };

  // 搜索过滤函数
  const handleSearch = (term) => {
    if (term === '') {
      setFilteredData(travelData); // 如果搜索框为空，显示所有数据
    } else {
      const filtered = travelData.filter(item => item.title.toLowerCase().includes(term.toLowerCase()));
      setFilteredData(filtered);
      setCurrentPage(0); // 搜索时重置页码到第一页
    }
  };

  // 使用 useCallback 和 debounce 包装 handleSearch，并将依赖关系明确传递
  const debouncedSearch = useCallback(
    debounce((term) => handleSearch(term), 300),
    [travelData]
  );

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term); // 调用防抖搜索
  };

  const handleSearchSubmit = () => {
    handleSearch(searchTerm);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="ranking-card">
      <div className="destination">
        <h1>旅游信息展示</h1>
        <p>Explore the best travel destinations!</p>
      </div>

      {/* 搜索栏 */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <TextField
          label="搜索景区"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearchSubmit}
                  startIcon={<SearchIcon />}
                >
                  搜索
                </Button>
              </InputAdornment>
            ),
          }}
          style={{ width: '50%' }}
        />
      </Box>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">图片</TableCell>
              <TableCell align="center">景区名</TableCell>
              <TableCell align="center">景区等级</TableCell>
              <TableCell align="center">省份</TableCell>
              <TableCell align="center">评分</TableCell>
              <TableCell align="center">价格</TableCell>
              <TableCell align="center">月销量</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align="center">{startIndex + index + 1}</TableCell>
                <TableCell align="center">
                  <img src={item.cover} alt={item.title} style={{ width: '100px' }} />
                </TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.level}</TableCell>
                <TableCell align="center">{item.province}</TableCell>
                <TableCell align="center">{item.score}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.saleCount}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => handleCommentClick(item.id)}>
                    点评
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" marginTop={2} alignItems="center">
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          上一页
        </Button>

        <TextField
          type="number"
          variant="outlined"
          size="small"
          value={currentPage + 1} 
          onChange={(e) => handlePageChange(e)} 
          inputProps={{ min: 1, max: totalPages }} 
          style={{ margin: '0 10px', width: '80px' }}
        />
        <span> / {totalPages}</span>

        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          style={{ marginLeft: '10px' }}
        >
          下一页
        </Button>
      </Box>
    </Box>
  );
};

export default TravelInfoTable;



