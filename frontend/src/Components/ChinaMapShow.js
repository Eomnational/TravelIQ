import React, { useEffect, useState } from 'react';
import axios from 'axios';           // 导入 axios
import ChinaMap from './ChinaMap';    // 导入中国地图组件

const ChinaMapShow = () => {
  const [geoData, setGeoData] = useState(null);  // 存储 geoData 的 state

  useEffect(() => {
    // 使用 axios 获取旅游数据
    axios.get('http://localhost:8000/api/home/')
      .then(response => {
        setGeoData(response.data.geoData);  // 提取并存储 geoData
        // console.log('Fetched geoData:', response.data.geoData);  // 打印数据以查看结构
      })
      .catch(error => {
        console.error('Error fetching geoData:', error);
      });
  }, []);

  return (
    <div className="destination">
      <h1>热门景点地图</h1>
      <p>Discover the beauty, all at your fingertips.</p>
      
      {/* 只有当 geoData 存在时，才渲染 ChinaMap */}
      {geoData && <ChinaMap data={geoData} />}
    </div>
  );
};

export default ChinaMapShow;
