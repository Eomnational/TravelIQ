import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/ThreeCards.css'; // 引入样式文件

const Card = ({ iconClass, value, title }) => {
  return (
    <div className="card-container">
      <div className="card-content">
        <i className={iconClass}></i>
        <span className="value">{value}</span>
        <p className="card-title">{title}</p>
      </div>
    </div>
  );
};

const ThreeCards = () => {
  const [data, setData] = useState({
    a5Len: 0,
    commentsLenTitle: '',
    provinceDicSort: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/home/');
        console.log('Fetched data:', response.data);  // 打印响应数据
        setData({
          a5Len: response.data.a5Len || 0,
          commentsLenTitle: response.data.commentsLenTitle || '暂无数据',
          provinceDicSort: response.data.provienceDicSort || '暂无数据',
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="three-cards">
      <Card iconClass="bi bi-cart" value={data.a5Len} title="5A级景点的个数" />
      <Card iconClass="bi bi-people" value={data.commentsLenTitle} title="评论最多的景区" />
      <Card iconClass="bi bi-currency-dollar" value={data.provinceDicSort} title="景点最多的省份" />
    </div>
  );
};

export default ThreeCards;
